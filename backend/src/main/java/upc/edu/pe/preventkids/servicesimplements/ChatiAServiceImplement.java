package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.chatIA;
import upc.edu.pe.preventkids.repositories.IChatIARepository;
import upc.edu.pe.preventkids.servicesinterfaces.IChatIAService;

import java.util.List;
import java.util.Optional;

@Service
public class ChatiAServiceImplement implements IChatIAService {
    @Autowired
    private IChatIARepository cR;

    @Override
    public List<chatIA> list() {return cR.findAll();}

    @Override
    public chatIA insert(chatIA c) {return cR.save(c);}

    @Override
    public Optional<chatIA> listId(int id) {return cR.findById(id); }

    @Override
    public void update(chatIA c) {cR.save(c);}

    @Override
    public void delete(int id) {cR.deleteById(id);}
}
