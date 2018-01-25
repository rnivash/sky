package Cash.Pages;

import java.io.IOException;
import javax.servlet.http.*;
import Users.Entities.*;
import com.google.gson.*;
import Cash.Entities.*;
import java.io.BufferedReader;
import java.util.List;
import java.util.Date;

public class AccountEngine extends HttpServlet {

    BankAccount bankAccount = null;
    Gson gson = null;
    BankAccountStore store = null;
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
            if (doWork.equals("GetAccount")) {
                store = new BankAccountStore();
                List<BankAccount> results = store.GetAccountDetails(user);
                output = gson.toJson(results);
            }
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

            String doWork = req.getParameter("doWork");
            gson = new Gson();
            store = new BankAccountStore();

            if (doWork.equals("AddAccount")) {
                bankAccount = GetBankAccount(GetPostDataFromStream(req));
                if (bankAccount != null) {
                    bankAccount.setUserKey(user.getKey());
					bankAccount.setCreatedDate(new Date());
                    store.AddAccount(bankAccount);
                }
            } else if (doWork.equals("DeleteAccount")) {
                bankAccount = GetBankAccount(GetPostDataFromStream(req));
                if (bankAccount != null) {
                    store.DeleteAccount(bankAccount);
                }
                output = gson.toJson(bankAccount);
            } else if (doWork.equals("UpdateAccount")) {
                bankAccount = GetBankAccount(GetPostDataFromStream(req));
                if (bankAccount != null) {
                    store.UpdateAccount(bankAccount);
                }
                output = gson.toJson(bankAccount);
            }
        } else {
        }
        SendOutput(resp, output);
    }

    private void SendOutput(HttpServletResponse resp, String output)
            throws IOException {
        resp.setContentType("text/plain");
        resp.getWriter().println(output);
    }

    private BankAccount GetBankAccount(String line) {
        BankAccount bankAccount1 = null;
        try {
            doLog(line);
            gson = new Gson();
            bankAccount1 = gson.fromJson(line, BankAccount.class);
        } catch (Exception e) {
            doLog(e.getMessage());
        }
        return bankAccount1;
    }

    private String GetPostDataFromStream(HttpServletRequest req) {
        String line = null;
        StringBuilder jb = new StringBuilder();
        try {

            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null) {
                jb.append(line);
            }
        } catch (Exception e) {
            doLog(e.getMessage());
        }
        return jb.toString();
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
