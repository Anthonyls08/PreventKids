-- ============================================================================
-- PreventKids - Base de conocimiento del Chat IA (seed)
-- Precarga la tabla chatia con preguntas y respuestas curadas de salud
-- infantil. El endpoint /chatIA/preguntar busca aqui primero (similitud de
-- Jaccard >= 60%); solo si no encuentra nada parecido llama a la API de
-- Gemini. Asi la demo funciona incluso sin internet y sin API key.
--
-- Ejecutar UNA sola vez sobre la BD "PreventKids".
-- Las respuestas respetan el limite de 300 caracteres de la columna.
-- ============================================================================

INSERT INTO chatia (pregunta, respuesta) VALUES
-- Nutricion ------------------------------------------------------------------
('Cuanta azucar puede consumir un nino al dia',
 'La OMS recomienda maximo 25 gramos de azucar libre al dia en ninos (unas 6 cucharaditas). Menos es mejor. Revisa las etiquetas: una gaseosa ya supera ese limite. Prefiere frutas frescas como postre.'),
('Cuantos vasos de agua debe tomar un nino al dia',
 'Entre 5 y 8 vasos al dia segun la edad y la actividad fisica. Mas si hace calor o deporte. El agua siempre es mejor opcion que jugos envasados o gaseosas.'),
('Que debe tener un desayuno saludable para ninos',
 'Un desayuno completo tiene: un lacteo (leche o yogurt), un cereal (avena, pan integral o quinua) y una fruta. Evita cereales azucarados. Un buen desayuno mejora la atencion en clases.'),
('Cuantas frutas y verduras debe comer un nino',
 'Al menos 5 porciones al dia entre frutas y verduras (unas 400 g). Varia los colores: cada color aporta vitaminas distintas. Las frutas peruanas como papaya, platano y mandarina son excelentes opciones.'),
('Es mala la comida chatarra para los ninos',
 'El exceso de comida chatarra aporta muchas calorias, sal y azucar con pocos nutrientes, y favorece la obesidad infantil. No hace falta prohibirla del todo: reservala para ocasiones especiales y en porciones pequenas.'),
('Que puedo poner en una lonchera saludable',
 'Combina: una fruta, un liquido (agua o refresco natural sin azucar) y algo solido nutritivo (huevo, queso, pan con palta, cancha o frutos secos segun la edad). Evita galletas, gaseosas y snacks fritos.'),
('Como prevenir la anemia en ninos',
 'Incluye alimentos ricos en hierro: sangrecita, higado, bazo, carnes rojas, pescado y menestras. Acompanalos con vitamina C (limonada, naranja) para absorber mejor el hierro. El control de hemoglobina periodico es clave.'),
('Que alimentos tienen calcio para los huesos',
 'Leche, yogurt, queso, y tambien pescados como anchoveta, tofu y menestras. El calcio junto con actividad fisica y vitamina D (sol moderado) fortalece los huesos en crecimiento.'),
('Es bueno que los ninos coman pescado',
 'Si, 2 a 3 veces por semana. El pescado aporta omega 3, que favorece el desarrollo del cerebro, y proteinas de calidad. Anchoveta, bonito y jurel son opciones nutritivas y economicas en Peru.'),
('Las gaseosas son malas para los ninos',
 'Las gaseosas y jugos envasados tienen mucha azucar y ningun nutriente. Su consumo frecuente se asocia a caries, sobrepeso y diabetes. La mejor bebida para un nino es el agua.'),
('Que es la quinua y por que es buena para los ninos',
 'La quinua es un grano andino con proteinas completas, hierro y fibra. Es ideal para el crecimiento: se puede dar en desayuno, guisos o mazamorras. Es uno de los alimentos mas nutritivos del Peru.'),
('Mi hijo no quiere comer verduras que hago',
 'Ofrece las verduras de formas variadas y atractivas (picadas, en tortillas, en salsas), da el ejemplo comiendolas tu tambien y no lo obligues ni castigues. Puede necesitar probar un alimento 10 veces antes de aceptarlo.'),
('Cuantas comidas al dia debe hacer un nino',
 'Lo usual son 3 comidas principales (desayuno, almuerzo, cena) y 1 o 2 refrigerios saludables. Mantener horarios regulares ayuda a evitar que pique dulces o snacks entre comidas.'),

-- Peso y crecimiento ----------------------------------------------------------
('Que es la obesidad infantil',
 'Es la acumulacion excesiva de grasa corporal en ninos, medida con el IMC segun edad y sexo. Aumenta el riesgo de diabetes e hipertension. Se previene con alimentacion balanceada, actividad fisica diaria y menos pantallas.'),
('Que es el IMC y como se calcula',
 'El IMC (indice de masa corporal) se calcula dividiendo el peso en kilos entre la talla en metros al cuadrado. En ninos se interpreta con tablas por edad y sexo. En PreventKids puedes registrar mediciones para seguirlo.'),
('Mi hijo esta bajo de peso que debo hacer',
 'Consulta con un pediatra o nutricionista para descartar causas. Mientras tanto ofrece comidas frecuentes y nutritivas (huevo, palta, menestras, lacteos) y evita llenar su estomago con liquidos antes de comer.'),
('Cada cuanto debo llevar a mi hijo a control medico',
 'Los ninos sanos en edad escolar deben tener un control medico al menos una vez al ano (peso, talla, vision, vacunas). Los mas pequenos requieren controles mas frecuentes segun el esquema de crecimiento y desarrollo.'),

-- Ejercicio y actividad fisica ------------------------------------------------
('Cuanto ejercicio debe hacer un nino al dia',
 'La OMS recomienda al menos 60 minutos diarios de actividad fisica moderada a intensa: correr, bailar, montar bicicleta o deportes. No tiene que ser de corrido; puede sumarse en bloques durante el dia.'),
('Que deporte es bueno para un nino de 8 anos',
 'A esa edad funcionan deportes que desarrollan coordinacion y trabajo en equipo: natacion, futbol, basquet, danza o artes marciales. Lo mas importante es que el nino lo disfrute para que sea constante.'),
('Es buena la natacion para los ninos',
 'Si, es de los ejercicios mas completos: trabaja todo el cuerpo, mejora la capacidad pulmonar y la postura, con bajo impacto en las articulaciones. Ademas es una habilidad de seguridad para toda la vida.'),
('Los ninos deben hacer estiramientos',
 'Si, estirar suavemente despues de jugar o hacer deporte mejora la flexibilidad y evita molestias musculares. Debe ser sin rebotes ni dolor, unos 10 a 15 segundos por musculo.'),
('Mi hijo pasa mucho tiempo sentado es malo',
 'Si, el sedentarismo prolongado afecta la postura, el peso y el animo. Procura pausas activas cada hora: pararse, estirarse o jugar. Sumar 60 minutos de movimiento al dia marca una gran diferencia.'),
('Como corregir la postura de mi hijo',
 'Cuida que la mochila no pese mas del 10-15% de su peso corporal, que use ambos tirantes, y que al estudiar tenga la espalda apoyada y la pantalla a la altura de los ojos. Ejercicios de espalda y natacion ayudan.'),

-- Sueno y pantallas -----------------------------------------------------------
('Cuantas horas debe dormir un nino',
 'Depende de la edad: de 6 a 12 anos necesitan 9 a 12 horas; los adolescentes, 8 a 10. Dormir bien mejora el aprendizaje, el animo y el crecimiento. Manten horarios fijos incluso los fines de semana.'),
('Cuanto tiempo de pantalla es recomendable para un nino',
 'Se recomienda maximo 1 a 2 horas diarias de pantallas recreativas en edad escolar, y evitarlas 1 hora antes de dormir. Menores de 2 anos: idealmente nada. Prioriza juego activo y lectura.'),
('Mi hijo no puede dormir por el celular',
 'La luz de las pantallas retrasa el sueno. Retira celulares y tablets del dormitorio, establece una hora fija para apagarlos (idealmente 1 hora antes de dormir) y reemplaza con lectura o musica tranquila.'),
('Por que es importante dormir bien para los ninos',
 'Durante el sueno se libera la hormona del crecimiento, se consolida la memoria y se recupera el cuerpo. Dormir poco se asocia a bajo rendimiento escolar, irritabilidad y mayor riesgo de sobrepeso.'),

-- Higiene y prevencion ----------------------------------------------------------
('Como ensenar a mi hijo a lavarse las manos',
 'Ensenale a lavarse con agua y jabon por 20 segundos (cantar feliz cumpleanos dos veces), antes de comer y despues del bano o de jugar. El lavado de manos es la forma mas efectiva de prevenir infecciones.'),
('Por que son importantes las vacunas',
 'Las vacunas protegen contra enfermedades graves como sarampion, polio y neumonia. Son seguras y gratuitas en los centros de salud. Manten el carnet de vacunacion al dia segun el esquema nacional.'),
('Como prevenir las caries en los ninos',
 'Cepillado 2 veces al dia con pasta con fluor (supervisado hasta los 8 anos), menos dulces y gaseosas, y visita al dentista cada 6 meses. Las caries no tratadas causan dolor y afectan la alimentacion.'),
('Cada cuanto se debe desparasitar a un nino',
 'En general se recomienda desparasitar a los ninos en edad escolar una o dos veces al ano, segun indicacion medica. Ayuda tambien lavar las manos, las frutas y verduras, y tomar agua segura.'),
('Los ninos deben usar protector solar',
 'Si, con factor 50 o mas, aplicado 20 minutos antes de exponerse al sol y renovado cada 2 horas. Evita el sol directo entre 10 am y 3 pm. Un poco de sol temprano ayuda a producir vitamina D.'),

-- Malestares comunes -----------------------------------------------------------
('Que hago si mi hijo tiene fiebre',
 'Manten al nino hidratado, con ropa ligera, y controla la temperatura. Si la fiebre supera 39 grados, dura mas de 2 dias, o hay decaimiento marcado, vomitos o manchas en la piel, acude de inmediato a un profesional de salud.'),
('Mi hijo tiene dolor de estomago frecuente',
 'Los dolores leves suelen deberse a comidas pesadas, gases o estrenimiento. Ofrece agua, comidas ligeras y observa. Si el dolor es intenso, localizado, con fiebre o vomitos, debe evaluarlo un medico.'),
('Como prevenir los resfriados en ninos',
 'Lavado de manos frecuente, alimentacion rica en frutas y verduras, dormir bien, abrigo adecuado y vacunas al dia (incluida la influenza). Los resfriados leves se manejan con hidratacion y reposo.'),
('Mi hijo puede ser alergico a algun alimento',
 'Las alergias mas comunes son a leche, huevo, mani, pescado y mariscos. Los sintomas van de ronchas y picazon a hinchazon o dificultad para respirar (emergencia). Ante la sospecha, consulta a un alergologo.'),

-- Bienestar emocional ------------------------------------------------------------
('Como afecta el bullying a la salud de un nino',
 'El bullying causa ansiedad, tristeza, bajo rendimiento y problemas de sueno o apetito. Escucha a tu hijo sin juzgarlo, avisa al colegio y busca apoyo psicologico si es necesario. No es algo que deba enfrentar solo.'),
('Como mejorar la autoestima de mi hijo',
 'Reconoce su esfuerzo y no solo el resultado, asignale responsabilidades acordes a su edad, evita compararlo con otros ninos y dedica tiempo a escucharlo. El deporte y los hobbies tambien fortalecen su confianza.'),
('Mi hijo esta muy ansioso o estresado que hago',
 'Manten rutinas estables, asegura buen sueno y actividad fisica diaria, y conversa sobre lo que siente. Reduce la sobrecarga de actividades. Si la ansiedad interfiere con el colegio o el sueno, busca apoyo psicologico.'),
('Cuanto tiempo debo dedicar a jugar con mi hijo',
 'El juego diario, aunque sean 20 a 30 minutos de atencion completa, fortalece el vinculo y el desarrollo emocional. Prefiere juego activo o de mesa antes que pantallas compartidas.');
