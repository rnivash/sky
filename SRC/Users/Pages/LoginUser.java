package Users.Pages;

import Base.Entities.*;
import java.io.IOException;
import javax.servlet.http.*;
import Users.Entities.*;
import com.google.gson.Gson;

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
        UserStore store = new UserStore();
        User user = store.AddNewUser(userName, password);
        if (user != null) {
            Login(userName, password, req, resp);
        } else {
            JSONResponse response = new JSONResponse();
            response.status = "failed";
            response.pageUrl = "";
            response.errorMsg = store.getErrorMessage();
            resp.getWriter().println(new Gson().toJson(response));
        }
    }

    private void Login(String userName, String password, HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JSONResponse response = new JSONResponse();
        UserStore store = new UserStore();
        User user = store.Login(userName, password);
        if (user != null) {
            HttpSession session = req.getSession();
            session.setAttribute("authenticatedUserName", user);
            response.status = "sucesses";
        } else {
            response.status = "failed";
            response.errorMsg = "Login failed for user --> " + userName;
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
            HttpSession session = req.getSession();
            session.setAttribute("authenticatedUserName", null);
            response.status = "sucesses";
        } catch (Exception ex) {
            response.status = "failed";
            response.errorMsg = ex.getMessage();
        }
        response.pageUrl = "js/login.js";
        resp.getWriter().println(new Gson().toJson(response));
    }
}
