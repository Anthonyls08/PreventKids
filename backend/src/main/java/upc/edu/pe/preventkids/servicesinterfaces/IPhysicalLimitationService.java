package upc.edu.pe.preventkids.servicesinterfaces;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;
import java.util.List;
import java.util.Optional;

public interface IPhysicalLimitationService {
    public List<PhysicalLimitation> list();
    public PhysicalLimitation insert(PhysicalLimitation p);
    public Optional<PhysicalLimitation> listId(int id);
    public void update(PhysicalLimitation p);
    public void delete(int id);
    public List<PhysicalLimitation> buscarPorCategoria(String categoria);
}
