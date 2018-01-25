/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Frame.Entities;

import javax.jdo.PersistenceManager;

/**
 *
 * @author Nivash
 */
public class EntityStoreBase {

    protected PersistenceManager pm;
    protected String errorMsg;

    public String getErrorMessage() {
        return errorMsg;
    }
    
    protected void open(){
        pm = SkyPersistenceManager.get().getPersistenceManager();
    }

    protected void close() {
        if (pm != null) {
            pm.close();
        }
    }
}
