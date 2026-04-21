package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.Alert;

@Repository
public interface IAlertRepository extends JpaRepository<Alert,Integer> {
}
