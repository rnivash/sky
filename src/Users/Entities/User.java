package Users.Entities;

import Frame.Entities.Entity;
import com.google.appengine.api.datastore.Key;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.IdentityType;
import java.io.*;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class User extends Entity implements Serializable {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;
    @Persistent
    private String userName;
    @Persistent
    private String passWord;
	@Persistent
    private Boolean isAdmin;

    public User(String userName, String password) {
        this.userName = userName;
        this.passWord = password;
		this.isAdmin = false;
    }
	
	public User(String userName, String password, boolean isAdmin) {
        this.userName = userName;
        this.passWord = password;
		this.isAdmin = isAdmin;
    }

    public Key getKey() {
        return this.key;
    }

    public String getUserName() {
        return this.userName;
    }

    public String getPassWord() {
        return this.passWord;
    }
	
	public boolean getIsAdmin() {
        return this.isAdmin;
    }
	
	public void setIsAdmin(boolean val) {
        this.isAdmin = val;
    }
}