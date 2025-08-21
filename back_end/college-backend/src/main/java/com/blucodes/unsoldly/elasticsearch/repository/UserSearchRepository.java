package com.blucodes.unsoldly.elasticsearch.repository;


import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import com.blucodes.unsoldly.elasticsearch.document.UserDocument;


@Repository
public interface UserSearchRepository extends ElasticsearchRepository<UserDocument, Integer> {
    List<UserDocument> findByFullName(String fullName);
}
