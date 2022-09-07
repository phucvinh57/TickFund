package com.tickfund.TFService.dtos.out;

import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;
import com.tickfund.TFService.entities.tickfund.ActionEntity;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceEntity;
import com.tickfund.TFService.entities.tickfund.RoleEntity;
import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;

public class PersonalDto {
    public String ID;
    public String username;
    public String name;
    public String phone;
    public String email;

    @JsonAlias({ "avatarURL", "avatarUrl" })
    public String avatarUrl;

    public String birthday;
    public ExpertiseEnum expertise;
    public Boolean active;
    public Object department;
    public Object personalLinks;

    public Role role;

    public void setRole(final List<PermissionEntity> permissionEntities) {
        this.role = new Role();
        this.role.ID = permissionEntities.get(0).role.ID;
        this.role.name = permissionEntities.get(0).role.name;

        this.role.resources = new HashSet<Resource>();
        for (PermissionEntity permission : permissionEntities) {
            ResourceEntity resourceEntity = permission.resource;
            this.role.resources.add(new Resource(resourceEntity.ID, resourceEntity.name));
        }
        for(Resource r: this.role.resources) {
            r.actions = new HashSet<>();
            for (PermissionEntity permission : permissionEntities) {
                if(r.ID == permission.resource.ID)
                    r.actions.add(permission.action);
            }
        }
    }

    public void setRole(RoleEntity role) {
        this.role = new Role();
        this.role.ID = role.ID;
        this.role.name = role.name;
        this.role.resources = null;
    }

    public void setInfo(TickLabUserEntity entity) {
        this.ID = entity.ID;
        this.username = entity.username;
        this.name = entity.name;
        this.phone = entity.phone;
        this.email = entity.email;
        this.avatarUrl = entity.avatarURL;
        if(entity.birthday != null) {
            this.birthday = entity.birthday.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        } else this.birthday = null;
        
        this.expertise = entity.expertise;
        this.active = entity.active;
        this.department = entity.department;
        this.personalLinks = entity.personalLinks;
    }

    class Role {
        public Integer ID;
        public String name;
        public Set<Resource> resources;
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
