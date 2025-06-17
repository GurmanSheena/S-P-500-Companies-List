package mrvirk.com.api.sp500;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "Company") 
public class Company {

    @Id
    @Indexed
    private int id; 
    private String name;
    private String symbol;
    private String exchange;
}