package Users.Entities;import Frame.Entities.*;import java.util.List;import javax.jdo.Query;public class UserStore extends EntityStoreBase {    public UserStore() {        pm = null;    }    public User AddNewUser(String userName, String password) {        User user = null;        try {            user = new User(userName, password);            this.open();            pm.makePersistent(user);        } catch (Exception ex) {            errorMsg = ex.getMessage();        } finally {            this.close();        }        return user;    }	public boolean IsUserNameAvailable(String userName){		boolean flag = false;        try {            this.open();            Query query = pm.newQuery(User.class);            query.setFilter("userName == userNameParam");                        query.declareParameters("String userNameParam");            try {                List<User> results = (List<User>) query.execute(userName);                if (results.size() == 0) {                    flag = true;                }            } finally {                query.closeAll();            }        } finally {            this.close();        }        return flag;	}    public User Login(String userName, String password) {        User user = null;        try {            this.open();            Query query = pm.newQuery(User.class);            query.setFilter("userName == userNameParam && passWord == userPassWord");                        query.declareParameters("String userNameParam,String userPassWord");            try {                List<User> results = (List<User>) query.execute(userName, password);                if (results.size() == 1) {                    user = results.get(0);                }            } finally {                query.closeAll();            }        } finally {            this.close();        }        return user;    }}