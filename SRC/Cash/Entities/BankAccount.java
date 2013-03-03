package Cash.Entities;

import Frame.Entities.Entity;
import com.google.appengine.api.datastore.Key;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.IdentityType;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class BankAccount extends Entity {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;
    @Persistent
    private Key userKey;
    @Persistent
    private String AccountName;
    @Persistent
    private double Amount;

    public BankAccount(Key userKey, String AccountName, double Amount) {
        this.userKey = userKey;
        this.AccountName = AccountName;
        this.Amount = Amount;
    }

    public Key getKey() {
        return this.key;
    }

    public Key getUserKey() {
        return this.userKey;
    }

    public void setUserKey(Key val) {
        this.userKey = val;
    }

    public String getAccountName() {
        return this.AccountName;
    }

    public void setAccountName(String val) {
        this.AccountName = val;
    }

    public double getAmount() {
        return this.Amount;
    }

    public void setAmount(double val) {
        this.Amount = val;
    }
}