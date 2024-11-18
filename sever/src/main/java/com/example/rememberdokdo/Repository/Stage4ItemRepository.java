package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.Stage4ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface Stage4ItemRepository extends JpaRepository<Stage4ItemEntity, Integer> {
    // 특정 미션 ID에 관련된 아이템 검색
    List<Stage4ItemEntity> findByRelatedMissionId(int relatedMissionId);

    // 특정 미션 ID와 아이템 이름으로 아이템 검색
    Optional<Stage4ItemEntity> findByRelatedMissionIdAndItemName(int relatedMissionId, String itemName);
}
