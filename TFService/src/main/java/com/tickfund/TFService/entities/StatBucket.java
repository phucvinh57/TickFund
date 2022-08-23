package com.tickfund.TFService.entities;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;
import java.util.stream.Collector;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatBucket {

    @JsonProperty("category_name")
    String categoryName;

    @JsonProperty("category_type")
    @JsonAlias({"type"})
    String categoryType;

    @JsonProperty
    Integer sum;

    @JsonProperty
    Integer year;

    @JsonProperty
    Integer month;

    @JsonProperty
    Integer week;

    @JsonProperty
    Integer day;

    public StatBucket(){}

    public StatBucket(StatBucket other){
        this.categoryName = other.categoryName;
        this.categoryType = other.categoryType;
        this.sum = other.sum;
        this.year = other.year;
        this.month = other.month;
        this.week = other.week;
        this.day = other.day;
    }

    String getKey(){
        final Integer EMPTY_NUM = 0;
        return String.valueOf(Optional.ofNullable(this.year).orElse(EMPTY_NUM))
                + String.valueOf(Optional.ofNullable(this.month).orElse(EMPTY_NUM))
                + String.valueOf(Optional.ofNullable(this.week).orElse(EMPTY_NUM))
                + String.valueOf(Optional.ofNullable(this.day).orElse(EMPTY_NUM))
                + this.categoryName
                + this.categoryType;
    }

    public StatBucket plus(StatBucket other){
        StatBucket copy = new StatBucket(other);
        copy.setSum(this.sum + copy.sum);
        return copy;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(String categoryType) {
        this.categoryType = categoryType;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }


    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }
    static void accumulate(HashMap<String, StatBucket> accumulateMap, StatBucket nextBucket) {
        if(accumulateMap.containsKey(nextBucket.getKey())){
            accumulateMap.put(nextBucket.getKey(), accumulateMap.get(nextBucket.getKey()).plus(nextBucket));
        }
        else {
            accumulateMap.put(nextBucket.getKey(), nextBucket);
        }
    }

    static HashMap<String, StatBucket> merge(HashMap<String, StatBucket> a, HashMap<String, StatBucket> b) {
        HashMap<String, StatBucket> mergeMap = new HashMap<>();
        mergeMap.putAll(a);
        for(Map.Entry<String, StatBucket> bEntry : b.entrySet()){
            if(mergeMap.containsKey(bEntry.getKey())){
                mergeMap.put(bEntry.getKey(), mergeMap.get(bEntry.getKey()).plus(bEntry.getValue()));
            }
            else {
                mergeMap.put(bEntry.getKey(), bEntry.getValue());
            }
        }
        return  mergeMap;
    }

    static List<StatBucket> finisher(HashMap<String, StatBucket> accumulateMap) {
        return accumulateMap.values().stream().toList();
    }

    public static Collector<StatBucket, HashMap<String, StatBucket>, List<StatBucket>> collectorToList(){
        return Collector.of(
                HashMap::new,
                StatBucket::accumulate,
                StatBucket::merge,
                StatBucket::finisher
        );
    }
}
