package com.dleawebsystem.ecommerce.dao;

import com.dleawebsystem.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustumerRepository extends JpaRepository<Customer, Long> {
}
