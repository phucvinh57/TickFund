package com.tickfund.TFService.dtos.out.roles;

import java.util.ArrayList;

import com.tickfund.TFService.commons.vos.RoleVo;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;

public class RolesWithPermissionDto {
    public ArrayList<RoleVo> roles;

    public RolesWithPermissionDto(ArrayList<ArrayList<PermissionEntity>> fragmentListPermissionEntity) {
        this.roles = new ArrayList<>();
        for (ArrayList<PermissionEntity> list : fragmentListPermissionEntity) {
            this.roles.add(new RoleVo(list));
        }
    }
}
