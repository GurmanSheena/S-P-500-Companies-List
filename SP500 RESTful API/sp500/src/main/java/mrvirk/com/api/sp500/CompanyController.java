package mrvirk.com.api.sp500;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
public class CompanyController {

      // Inject the CompanyService dependency into class
    @Autowired 
      private CompanyService service;

      // to insert new Company data into the Redis database.
    @PostMapping
    public Company addCompany(@RequestBody Company company){

        return service.addCompany(company);
    }

      // to fetch All the Companys from the Redis database
    @GetMapping 
      public List<Company> getListOfCompanies(){
   
        return service.getAllCompanies();
    }

      // to fetch Company data using ID from Redis Database
    @GetMapping("/{id}")
    public Company getCompany(@PathVariable int id){
      
        return service.getCompanyById(id);
    }

      // to update an existing Company in the Redis database using ID.
    @PutMapping("/{id}")
    public Company
    updateCompany(@PathVariable int id,
                   @RequestBody Company newCompany){
      
        return service.updateCompanyById(id, newCompany);
    }

      // to delete an existing Company from the Redis database using ID
    @DeleteMapping("/{id}")
    public String deleteCompany(@PathVariable int id){
      
        service.deleteCompanyById(id);
        return "Company Deleted Successfully";
    }
}