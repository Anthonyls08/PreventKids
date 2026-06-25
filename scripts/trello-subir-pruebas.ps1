<#
================================================================================
  Subir pruebas (test cases) a un tablero de Trello
================================================================================

  USO RAPIDO
  ----------
  1) Consigue tu API key y token (ver instrucciones abajo) y pegalos en
     $ApiKey y $Token, o pasalos como parametros.

  2) Descubre el ID de la lista (columna) donde quieres crear las tarjetas:

        ./trello-subir-pruebas.ps1 -ApiKey "xxx" -Token "yyy" -ListLists

     Eso imprime tus tableros y, si pasas -BoardId, sus listas con sus IDs.

  3) Crea las tarjetas en esa lista:

        ./trello-subir-pruebas.ps1 -ApiKey "xxx" -Token "yyy" -ListId "zzz"

  COMO OBTENER API KEY Y TOKEN
  ----------------------------
  - Entra a  https://trello.com/power-ups/admin  e crea un "Power-Up" (cualquier
    nombre). Ahi te dan tu "API Key".
  - En la misma pagina de la API Key hay un enlace "Token" / "manually generate
    a Token": haz clic, autoriza, y copia el token largo que aparece.
    (Tambien sirve: https://trello.com/1/authorize?expiration=1day&scope=read,write&response_type=token&key=TU_API_KEY )
================================================================================
#>

param(
    [string]$ApiKey = "",
    [string]$Token  = "",
    [string]$ListId = "",
    [string]$BoardId = "",
    [switch]$ListLists
)

$ErrorActionPreference = "Stop"

if (-not $ApiKey) { $ApiKey = $env:TRELLO_KEY }
if (-not $Token)  { $Token  = $env:TRELLO_TOKEN }

if (-not $ApiKey -or -not $Token) {
    Write-Host "Falta -ApiKey y/o -Token (o las variables de entorno TRELLO_KEY / TRELLO_TOKEN)." -ForegroundColor Red
    exit 1
}

$auth = "key=$ApiKey&token=$Token"

# ----------------------------------------------------------------------------
# Modo descubrimiento: lista tableros y, si das -BoardId, sus listas
# ----------------------------------------------------------------------------
if ($ListLists) {
    Write-Host "`n=== Tus tableros ===" -ForegroundColor Cyan
    $boards = Invoke-RestMethod -Uri "https://api.trello.com/1/members/me/boards?fields=name,url&$auth"
    foreach ($b in $boards) {
        Write-Host ("{0}  ->  {1}" -f $b.id, $b.name)
    }

    if ($BoardId) {
        Write-Host "`n=== Listas (columnas) del tablero $BoardId ===" -ForegroundColor Cyan
        $lists = Invoke-RestMethod -Uri "https://api.trello.com/1/boards/$BoardId/lists?fields=name&$auth"
        foreach ($l in $lists) {
            Write-Host ("{0}  ->  {1}" -f $l.id, $l.name)
        }
    } else {
        Write-Host "`nVuelve a correr con -BoardId <id> para ver las listas de ese tablero." -ForegroundColor Yellow
    }
    exit 0
}

if (-not $ListId) {
    Write-Host "Falta -ListId. Corre primero con -ListLists para encontrarlo." -ForegroundColor Red
    exit 1
}

# ----------------------------------------------------------------------------
# Casos de prueba a subir. Edita esta lista a tu gusto.
#   name = titulo de la tarjeta
#   desc = descripcion (soporta markdown de Trello)
# ----------------------------------------------------------------------------
$pruebas = @(
    @{
        name = "[Login] Inicio de sesion con credenciales validas"
        desc = "*Precondicion:* usuario existente con estado 'Activo'.`n`n*Pasos:*`n1. Ir a /login`n2. Ingresar email y contrasena correctos`n3. Presionar Ingresar`n`n*Resultado esperado:* redirige a /app/homes y guarda el token JWT."
    },
    @{
        name = "[Login] Credenciales invalidas muestran error"
        desc = "*Pasos:*`n1. Ir a /login`n2. Ingresar email o contrasena incorrectos`n3. Presionar Ingresar`n`n*Resultado esperado:* mensaje 'Correo o contrasena incorrectos' y no redirige."
    },
    @{
        name = "[Registro] Registro de nuevo usuario"
        desc = "*Pasos:*`n1. Ir a /register`n2. Completar nombre, apellido, email, contrasena, genero, fecha, telefono`n3. Seleccionar Rol y Distrito`n4. Crear cuenta`n`n*Resultado esperado:* usuario creado (estado Activo) y redirige a /login."
    },
    @{
        name = "[Registro] Validacion de campos obligatorios"
        desc = "*Pasos:*`n1. Ir a /register`n2. Dejar campos vacios o email invalido`n3. Intentar enviar`n`n*Resultado esperado:* se muestran los mensajes de error y no se envia el formulario."
    },
    @{
        name = "[Seguridad] Acceso a /app sin sesion redirige a login"
        desc = "*Pasos:*`n1. Sin haber iniciado sesion, escribir /app/homes en la URL`n`n*Resultado esperado:* el guard redirige a /login."
    },
    @{
        name = "[Limitacion Fisica] Listar registros"
        desc = "*Pasos:*`n1. Iniciar sesion`n2. Menu -> Limitacion Fisica -> Listar`n`n*Resultado esperado:* la tabla muestra los registros existentes (nombre, descripcion, categoria)."
    },
    @{
        name = "[Limitacion Fisica] Registrar nueva limitacion"
        desc = "*Pasos:*`n1. Limitacion Fisica -> Registrar`n2. Completar los 5 campos (nombre, descripcion, categoria, ejercicios prohibidos, intensidad)`n3. Guardar`n`n*Resultado esperado:* se guardan los 5 campos y redirige al listado."
    },
    @{
        name = "[Limitacion Fisica] Editar carga la data en el formulario"
        desc = "*Pasos:*`n1. En el listado, presionar el boton editar de una fila`n`n*Resultado esperado:* el formulario abre con todos los datos del registro precargados."
    },
    @{
        name = "[Limitacion Fisica] Eliminar registro"
        desc = "*Pasos:*`n1. En el listado, presionar el boton eliminar`n`n*Resultado esperado:* el registro desaparece de la tabla."
    },
    @{
        name = "[Recomendaciones] Carrusel rota automaticamente"
        desc = "*Pasos:*`n1. Iniciar sesion y entrar al panel`n`n*Resultado esperado:* el carrusel lateral muestra ejercicios en espanol (API wger) y cambia solo cada 5 segundos."
    }
)

# ----------------------------------------------------------------------------
# Creacion de las tarjetas
# ----------------------------------------------------------------------------
Write-Host "Creando $($pruebas.Count) tarjetas en la lista $ListId ...`n" -ForegroundColor Cyan
$ok = 0
foreach ($p in $pruebas) {
    try {
        $body = @{
            idList = $ListId
            name   = $p.name
            desc   = $p.desc
            pos    = "bottom"
        }
        $card = Invoke-RestMethod -Method Post -Uri "https://api.trello.com/1/cards?$auth" -Body $body
        Write-Host ("  OK  {0}" -f $card.name) -ForegroundColor Green
        $ok++
    } catch {
        Write-Host ("  ERROR  {0}  ->  {1}" -f $p.name, $_.Exception.Message) -ForegroundColor Red
    }
}

Write-Host "`nListo: $ok de $($pruebas.Count) tarjetas creadas." -ForegroundColor Cyan
