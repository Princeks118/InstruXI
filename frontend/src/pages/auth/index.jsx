import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CommonForm from "../../components/common-form";
import {
  signInFormControls,
  signUpFormControls,
} from "../../config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { AuthContext } from "../../context/auth-context";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signinFormData,
    setsigninFormData,
    signupFormData,
    setsignupFormData,
    handleregisterUser,
    handleSigninUser
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center shadow bg-white">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-semibold"
        >
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <span>InstruLearn</span>
        </Link>
      </header>

      {/* Main Auth Section */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-md"
        >
          {/* Tabs Trigger */}
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Welcome back!</CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signInFormControls}
                  formData={signinFormData}
                  setFormData={setsigninFormData}
                  handleSubmit={handleSigninUser}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your info below</CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signUpFormControls}
                  formData={signupFormData}
                  setFormData={setsignupFormData}
                  handleSubmit={handleregisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default AuthPage;
