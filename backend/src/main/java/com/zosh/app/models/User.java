package com.zosh.app.models;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class User {
    private String fullName;
    private String status;
    private Boolean isSingle;
    private String email;
    private String phoneNumber;
}
