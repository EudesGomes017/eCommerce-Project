package com.dleawebsystem.ecommerce.dao;

import com.dleawebsystem.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface CustumerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);
}
