package mrvirk.com.api.sp500;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

      // Injecting Repository into service class
    @Autowired 
      private CompanyRepo repo;

      // to insert new Company data into the Redis database
    public Company addCompany(Company company){

        return repo.save(company);
    }

      // run a fetch query in the Redis Database
      // to get a list of all the Companys
    public List<Company> getAllCompanies(){

        List<Company> allCompanies = new ArrayList<>();
        repo.findAll().forEach(allCompanies::add);
        return allCompanies;
    }

      // fetch operation to get Company using an ID
    public Company getCompanyById(int id){

        Optional<Company> optionalCompany
            = repo.findById(String.valueOf(id));
        return optionalCompany.orElse(null);
    }

      
      // update operation to existing Company using an ID
    public Company updateCompanyById(int id,
                                       Company newCompany){
      
        Optional<Company> existingCompany
            = repo.findById(String.valueOf(id));

        if (existingCompany.isPresent()) {
            Company updatedCompany
                = existingCompany.get();

            updatedCompany.setName(newCompany.getName());
            updatedCompany.setPhone(newCompany.getPhone());
            updatedCompany.setEmail(newCompany.getEmail());

            repo.deleteById(String.valueOf(id));
            return repo.save(updatedCompany);
        }

        return null;
    }

      // delete the existing Company
    public void deleteCompanyById(int id){
        repo.deleteById(String.valueOf(id));
    }
}