package com.tickfund.TFService.database_configs;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "tickfundEntityManagerFactory", transactionManagerRef = "tickfundTransactionManager", basePackages = {
        "com.tickfund.TFService.entities.tickfund", "com.tickfund.TFService.repositories.tickfund" })
public class TickFundDbConfig {
    @Value("${spring.datasource.driver-class-name}")
    private String driver;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Bean
    @Primary
    public DataSource tickfundDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(this.driver);
        dataSource.setUrl(this.url);
        dataSource.setUsername(this.username);
        dataSource.setPassword(this.password);

        return dataSource;
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean tickfundEntityManagerFactory(
        EntityManagerFactoryBuilder builder
    ) {
        return builder.dataSource(this.tickfundDataSource())
            .packages(
                "com.tickfund.TFService.entities.tickfund", 
                "com.tickfund.TFService.repositories.tickfund"
            )
            .persistenceUnit("tickfundPU")
            .build();
    }

    @Bean
    @Primary
    public TransactionManager tickfundTransactionManager(EntityManagerFactoryBuilder builder) {
        JpaTransactionManager manager = new JpaTransactionManager();
        manager.setDataSource(this.tickfundDataSource());
        manager.setEntityManagerFactory(this.tickfundEntityManagerFactory(builder).getObject());

        return manager;
    }
}
