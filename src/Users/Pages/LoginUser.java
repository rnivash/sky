package Users.Pages;

import Base.Entities.*;
import java.io.IOException;
import javax.servlet.http.*;
import Users.Entities.*;
import com.google.gson.Gson;
import java.net.*;

public class LoginUser extends HttpServlet {

    public @Override
    void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String doWork = req.getParameter("doWork");
        resp.setContentType("text/plain");
        if (doWork.equals("Login")) {
            String userName = req.getParameter("userName");
            String password = req.getParameter("password");
            Login(userName, password, req, resp);
        } else if (doWork.equals("checkLogin")) {
            CheckLogin(req, resp);
        } else if (doWork.equals("Register")) {
            String userName = req.getParameter("userName");
            String password = req.getParameter("password");
            Register(userName, password, req, resp);
        } else if (doWork.equals("Logout")) {
            Logout(req, resp);
        }
    }

    private void Register(String userName, String password, HttpServletRequest req, HttpServletResponse resp) throws IOException {
		JSONResponse response = new JSONResponse();
        UserStore store = new UserStore();		
		User user = null;
		String debug="io:";
		for (int i=0; i < userName.length(); i++) {                    
            char c = userName.charAt(i);
            int intC = (int) c;
            debug = debug+ Integer.toString(intC);            
        }
		if(userName.replace(String.valueOf((char) 32), " ").trim() == "" 
		|| password.replace(String.valueOf((char) 32), " ").trim() == ""){
			response.errorMsg = "* Invalid input.";	
		}
		else{
			if(store.IsUserNameAvailable(userName)){
				user = store.AddNewUser(userName, password);
			}
			else{
				response.errorMsg = "* user name is not available.";			
			}
		}
        if (user != null) {
            Login(userName, password, req, resp);
        } else {            
            response.status = "failed";
            response.pageUrl = "";
            //response.errorMsg = store.getErrorMessage();
            resp.getWriter().println(new Gson().toJson(response));
        }
    }

    private void Login(String userName, String password, HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JSONResponse response = new JSONResponse();
        UserStore store = new UserStore();
		User user = null;
		
		if(userName.replace(String.valueOf((char) 160), " ").trim() == "" 
		|| password.replace(String.valueOf((char) 160), " ").trim() == ""){
			response.errorMsg = "* Invalid input.";	
		}
		else{
			user = store.Login(userName, password);
			response.errorMsg = "* Login failed for user: " + userName;
		}
        
        if (user != null) {
            HttpSession session = req.getSession();
            session.setAttribute("authenticatedUserName", user);
            response.status = "sucesses";
			response.errorMsg = "";
        } else {
            response.status = "failed";
            //response.errorMsg = "Login failed for user --> " + userName;
        }
        response.pageUrl = "js/home.js";
        resp.getWriter().println(new Gson().toJson(response));
    }

    private void CheckLogin(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JSONResponse response = new JSONResponse();        
        try {
            HttpSession session = req.getSession();
            if (session.getAttribute("authenticatedUserName") != null) {
                response.status = "sucesses";
				response.userData = (User) session.getAttribute("authenticatedUserName");
            } else {
                response.status = "failed";
            }
        } catch (Exception ex) {
            response.status = "failed";
            response.errorMsg = ex.getMessage();
        }
        response.pageUrl = "";
        resp.getWriter().println(new Gson().toJson(response));
    }

    private void Logout(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JSONResponse response = new JSONResponse();
        try {
            HttpSession session = req.getSession(false);
    
            if(session != null){
                session.invalidate();
            }

            response.status = "sucesses";
            req.getSession();
        } catch (Exception ex) {
            response.status = "failed";
            response.errorMsg = ex.getMessage();
        }
        response.pageUrl = "js/login.js";
        resp.getWriter().println(new Gson().toJson(response));
    }
}
