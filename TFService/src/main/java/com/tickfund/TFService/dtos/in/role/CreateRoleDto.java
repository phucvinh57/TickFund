package com.tickfund.TFService.dtos.in.role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CreateRoleDto {
    @NotBlank
    @Size(min = 4, message = "Tên vai trò phải đủ ít nhất 4 ký tự")
    public String roleName;
}
