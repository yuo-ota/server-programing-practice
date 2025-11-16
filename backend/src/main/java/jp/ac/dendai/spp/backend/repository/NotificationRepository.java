package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;

import jp.ac.dendai.spp.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {}
