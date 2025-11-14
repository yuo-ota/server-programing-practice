package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;


import jp.ac.dendai.spp.backend.entity.SocialAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialAccountRepository extends JpaRepository<SocialAccount, UUID> {}
