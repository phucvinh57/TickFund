package com.tickfund.TFService.dtos.in.user;

import java.time.LocalDate;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;

public class CreateUserDto {
    @NotBlank
    @Size(min = 7, max = 7)
    @JsonProperty
    @JsonAlias({ "student_id", "studentId", "studentID", "MSSV" })
    public String ID;

    @NotBlank
    @JsonProperty
    public String name;

    @NotBlank
    @JsonProperty
    @Size(min = 5, message = "Username must have at least 5 characters")
    public String username;

    @JsonProperty
    @JsonAlias({ "avatarURL", "avatar_url" })
    public String avatarUrl;

    @JsonProperty
    @NotNull
    public ExpertiseEnum expertise;

    @JsonProperty
    @JsonAlias({ "role_id", "roleID" })
    public Integer roleId;

    @JsonProperty
    public LocalDate birthday;

    @JsonProperty
    @NotNull
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-]"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Invalid email")
    public String email;

    @JsonProperty
    @Size(max = 15)
    @Pattern(regexp = "^\\d{10}$", message = "Invalid phone number")
    public String phone;

    @JsonProperty
    public Set<String> personalLinks;

    @JsonProperty
    @JsonAlias({ "departmentID", "department_id" })
    @NotNull
    public Integer departmentId;
}
