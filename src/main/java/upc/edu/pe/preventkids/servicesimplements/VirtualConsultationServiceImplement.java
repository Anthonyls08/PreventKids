package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.VirtualConsultation;
import upc.edu.pe.preventkids.repositories.IVirtualConsultationRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IVirtualConsultationService;

import java.util.List;
import java.util.Optional;
@Service
public class VirtualConsultationServiceImplement implements IVirtualConsultationService {
    @Autowired
    private IVirtualConsultationRepository vcR;

    @Override
    public List<VirtualConsultation> list() {
        return vcR.findAll();
    }

    @Override
    public VirtualConsultation insert(VirtualConsultation v) {
        return vcR.save(v);
    }

    @Override
    public Optional<VirtualConsultation> listId(int id) {
        return vcR.findById(id);
    }

    @Override
    public void update(VirtualConsultation v) {
        vcR.save(v);
    }

    @Override
    public void delete(int id) {
        vcR.deleteById(id);
    }

    @Override
    public List<VirtualConsultation> decidirPrioridadConsultaPaciente(String estadoConsulta, String nombrePaciente) {
        return vcR.decidirPrioridadConsultaPaciente(estadoConsulta, nombrePaciente);
    }
}
