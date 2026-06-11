package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.VirtualConsultation;

import java.util.List;
import java.util.Optional;

public interface IVirtualConsultationService {
    public List<VirtualConsultation> list();
    public VirtualConsultation insert(VirtualConsultation v);
    public Optional<VirtualConsultation> listId(int id);
    public void update(VirtualConsultation v);
    public void delete(int id);
    public List<VirtualConsultation> decidirPrioridadConsultaPaciente(String estadoConsulta, String nombrePaciente);
}
