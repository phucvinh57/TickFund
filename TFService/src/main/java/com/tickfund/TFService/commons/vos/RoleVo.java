package com.tickfund.TFService.commons.vos;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.tickfund.TFService.entities.tickfund.ActionEntity;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceEntity;

public class RoleVo {
    public Integer ID;
    public String name;
    public Set<Resource> resources;

    public RoleVo(List<PermissionEntity> permissionEntities) {
        this.ID = permissionEntities.get(0).role.ID;
        this.name = permissionEntities.get(0).role.name;

        this.resources = new HashSet<Resource>();
        for (PermissionEntity permission : permissionEntities) {
            ResourceEntity resourceEntity = permission.resource;
            this.resources.add(new Resource(resourceEntity.ID, resourceEntity.name));
        }
        for(Resource r: this.resources) {
            r.actions = new HashSet<>();
            for (PermissionEntity permission : permissionEntities) {
                if(r.ID == permission.resource.ID)
                    r.actions.add(permission.action);
            }
        }
    }

    class Resource {
        public Integer ID;
        public String name;
        public Set<ActionEntity> actions;

        public Resource(Integer ID, String name) {
            this.ID = ID;
            this.name = name;
        }

        @Override
        public int hashCode() {
            return this.ID;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (this.getClass() != obj.getClass())
                return false;
            Resource r = (Resource) obj;
            if (this.ID != r.ID)
                return false;
            if (this.name != r.name)
                return false;
            return true;
        }
    }
}
