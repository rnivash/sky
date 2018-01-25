package Scripts.Pages;

import java.io.IOException;
import javax.servlet.http.*;
import Users.Entities.*;
import com.google.gson.*;
import Cash.Entities.*;
import Scripts.Entities.*;
import java.io.BufferedReader;
import java.util.List;
import java.util.Date;

public class ScriptsEngine extends HttpServlet {

   
    Gson gson = null;
    ScriptsStore store = null;
    User user = null;
    String parseoutput = "";

    public @Override
    void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String doWork = req.getParameter("doWork");
        String output = "";
        parseoutput = "";
        user = CheckUserSession(req);

        if (user != null) {
            gson = new Gson();
            if (doWork.equals("Script1")) {
                store = new ScriptsStore();
				store.Script1();                
            }
			else if (doWork.equals("Script2")) {
                store = new ScriptsStore();
				String name = req.getParameter("name");
				String flag = req.getParameter("flag");
				store.Script2(name,(flag == "true"));                
            }
			output = "done";
        }
        SendOutput(resp, output);
    }

    public @Override
    void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String output = "";
        parseoutput = "";
        user = CheckUserSession(req);
        if (user != null) {

                      
        } 
        SendOutput(resp, output);
    }

    private void SendOutput(HttpServletResponse resp, String output)
            throws IOException {
        resp.setContentType("text/plain");
        resp.getWriter().println(output);
    }

    private User CheckUserSession(HttpServletRequest req) {
        HttpSession session = req.getSession();
        if (session.getAttribute("authenticatedUserName") != null) {
            user = (User) session.getAttribute("authenticatedUserName");
        }
        return user;
    }

    private void doLog(String msg) {
        parseoutput += msg;
    }
}
