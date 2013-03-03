package Frame.Entities;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManagerFactory;

public final class SkyPersistenceManager {

    private static final PersistenceManagerFactory pmfInstance =
            JDOHelper.getPersistenceManagerFactory("transactions-optional");

    private SkyPersistenceManager() {
    }

    public static PersistenceManagerFactory get() {
        return pmfInstance;
    }
}