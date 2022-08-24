package com.tickfund.TFService.database_configs;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.TransactionManager;
@Configuration
@EnableJpaRepositories(entityManagerFactoryRef = "ticklabUsersEntityManagerFactory", transactionManagerRef = "ticklabUsersTransactionManager", basePackages = {
        "com.tickfund.TFService.entities.ticklab_users", "com.tickfund.TFService.repositories.ticklab_users" })
public class TickLabUsersDbConfig {
    @Value("${spring.seconddatasource.driver-class-name}")
    private String driver;

    @Value("${spring.seconddatasource.url}")
    private String url;

    @Value("${spring.seconddatasource.username}")
    private String username;

    @Value("${spring.seconddatasource.password}")
    private String password;

    @Bean
    public DataSource ticklabUsersDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(this.driver);
        dataSource.setUrl(this.url);
        dataSource.setUsername(this.username);
        dataSource.setPassword(this.password);

        return dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean ticklabUsersEntityManagerFactory(
        EntityManagerFactoryBuilder builder
    ) {
        return builder.dataSource(this.ticklabUsersDataSource())
            .packages(
                "com.tickfund.TFService.entities.ticklab_users", 
                "com.tickfund.TFService.repositories.ticklab_users"
            )
            .persistenceUnit("ticklabUsersPU")
            .build();
    }

    @Bean
    public TransactionManager ticklabUsersTransactionManager(EntityManagerFactoryBuilder builder) {
        JpaTransactionManager manager = new JpaTransactionManager();
        manager.setDataSource(this.ticklabUsersDataSource());
        manager.setEntityManagerFactory(this.ticklabUsersEntityManagerFactory(builder).getObject());

        return manager;
    }
}
