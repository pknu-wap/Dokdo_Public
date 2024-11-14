package com.example.rememberdokdo.Filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Collection;

@Component
public class SameSiteCookieFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(request, response);

        // 응답이 HttpServletResponse 타입인지 확인
        if (response instanceof HttpServletResponse) {
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;

            // 모든 Set-Cookie 헤더를 가져옴
            Collection<String> headers = httpServletResponse.getHeaders("Set-Cookie");

            // 각 헤더를 확인하여 필요한 경우 SameSite=None; Secure 속성 추가
            for (String header : headers) {
                // SESSIONID 쿠키에만 SameSite=None; Secure 속성을 추가
                if (header.startsWith("SESSIONID")) {
                    httpServletResponse.setHeader("Set-Cookie", header + "; SameSite=None; Secure");
                }
            }
        }
    }

}
