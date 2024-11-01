package com.user_management.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .csrf()
            .disable()
            .authorizeHttpRequests()
            .requestMatchers("/**")
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}



//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//@EnableMethodSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .cors(withDefaults())
//                .authorizeRequests(authorizeRequests ->
//                        authorizeRequests
//                                //.requestMatchers("/**").permitAll()
//                                .requestMatchers("/api/v1/users/**").hasRole("ADMIN")
//                                .requestMatchers("/api/v1/products/**").permitAll()
//                                .requestMatchers("/api/v1/login").permitAll()
//
//                                //.requestMatchers("/api/v1/**").permitAll()
//                                //.requestMatchers("/api/v1/users/**").hasRole("USER")
//                                //.requestMatchers("/api/v1/products/**").permitAll()
//                                //.requestMatchers("/api/v1/users/login/**").permitAll()
//
//                                //.requestMatchers("/api/v1/users/**").hasRole("ADMIN")
//                                //.requestMatchers("/api/v1/login/**").permitAll()
//                                //.requestMatchers("/api/v1/products/**").hasRole("ADMIN")
//                                .anyRequest().authenticated()
//                )
//                .httpBasic();
//        return http.build();
//    }
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
//            }
//        };
//    }
//}
