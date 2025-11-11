package jp.ac.dendai.spp.backend.dto;

public class SocialAccount {
    private String name;
    private String identifier;

    public SocialAccount() {
    }

    public SocialAccount(String name, String identifier) {
        this.name = name;
        this.identifier = identifier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
