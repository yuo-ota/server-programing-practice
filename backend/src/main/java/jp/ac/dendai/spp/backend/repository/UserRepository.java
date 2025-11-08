package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.spp.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {}
