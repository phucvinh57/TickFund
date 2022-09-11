package com.tickfund.TFService.dtos.out.roles;

import java.util.ArrayList;

import com.tickfund.TFService.commons.vos.RoleVo;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;

public class RolesWithPermissionDto {
    public ArrayList<RoleVo> permissions;

    public RolesWithPermissionDto(ArrayList<ArrayList<PermissionEntity>> fragmentListPermissionEntity) {
        this.permissions = new ArrayList<>();
        for (ArrayList<PermissionEntity> list : fragmentListPermissionEntity) {
            this.permissions.add(new RoleVo(list));
        }
    }

    public void add(RoleVo rVo) {
        this.permissions.add(rVo);
    }

    public ArrayList<RoleVo> getPermissions() {
        return this.permissions;
    }

}
