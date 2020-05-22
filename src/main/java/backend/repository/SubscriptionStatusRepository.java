package backend.repository;

import backend.entity.SubscriptionStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionStatusRepository extends CrudRepository<SubscriptionStatus, Short> {
	//TODO add custom method
}
