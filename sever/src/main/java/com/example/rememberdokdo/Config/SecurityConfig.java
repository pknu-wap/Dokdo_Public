/*import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 비활성화 (테스트 환경에서만)
                .authorizeHttpRequests()
                .requestMatchers("/session/start", "/session/refresh").permitAll()  // 인증 해제 경로
                .anyRequest().authenticated();  // 다른 모든 요청은 인증 필요

        return http.build();
    }
}*/
