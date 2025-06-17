package mrvirk.com.api.sp500;

import org.springframework.data.repository.CrudRepository;

//@Repository
public interface CompanyRepo extends CrudRepository<Company,String> {
  
  // this interface will provide all basic operations for Company Entity, to create a custom query we can define a method for that.

}