package com.tickfund.TFService.dtos.out.roles;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import com.tickfund.TFService.entities.tickfund.ActionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceActionMappingEntity;

public class ResourceActionMappingDto {
    public Set<Resource> resources;

    public ResourceActionMappingDto(ArrayList<ResourceActionMappingEntity> list) {
        resources = new HashSet<>();
        for (ResourceActionMappingEntity mapping : list) {
            resources.add(new Resource(mapping.resource.ID, mapping.resource.name));
        }
        for (Resource resource : resources) {
            for (ResourceActionMappingEntity mapping : list) {
                if(resource.ID == mapping.resource.ID) {
                    resource.actions.add(mapping.action);
                }
            }
        }
    }

    class Resource {
        public Integer ID;
        public String name;
        public ArrayList<ActionEntity> actions;

        public Resource(Integer ID, String name) {
            this.ID = ID;
            this.name = name;
            this.actions = new ArrayList<>();
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
