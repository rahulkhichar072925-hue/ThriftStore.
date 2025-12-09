'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  // auth UI state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'seller' | 'user' | null

  // login form state
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // forgot password state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  // signup state
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupContact, setSignupContact] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const userId = process.env.NEXT_PUBLIC_DUMMY_USER_ID;
    const userPassword = process.env.NEXT_PUBLIC_DUMMY_USER_PASSWORD;

    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const sellerId = process.env.NEXT_PUBLIC_SELLER_ID;
    const sellerPassword = process.env.NEXT_PUBLIC_SELLER_PASSWORD;

    // 1) Admin login
    if (loginId === adminId && loginPassword === adminPassword) {
      setIsAuthenticated(true);
      setUserRole("admin");
      setIsLoginOpen(false);
      setLoginError("");
      setLoginPassword("");
      router.push("/admin");
      return;
    }

    // 2) Seller login
    if (loginId === sellerId && loginPassword === sellerPassword) {
      setIsAuthenticated(true);
      setUserRole("seller");
      setIsLoginOpen(false);
      setLoginError("");
      setLoginPassword("");
      router.push("/store");
      return;
    }

    // 3) Normal user login
    if (loginId === userId && loginPassword === userPassword) {
      setIsAuthenticated(true);
      setUserRole("user");
      setIsLoginOpen(false);
      setLoginError("");
      setLoginPassword("");
      return;
    }

    // 4) Invalid
    setLoginError("Invalid ID or Password");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    setUserRole(null);
    setLoginId("");
    setLoginPassword("");
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;

    // dummy behavior
    setForgotMessage(
      "Reset link sent to your email. Please check your inbox."
    );
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match.");
      setSignupSuccess("");
      return;
    }

    // dummy sign up behavior
    setSignupError("");
    setSignupSuccess("User created successfully.");
    alert("User created successfully");
  };

  // Name based on role
  const dummyUserName =
    userRole === "admin"
      ? process.env.NEXT_PUBLIC_ADMIN_NAME || "Admin"
      : userRole === "seller"
      ? process.env.NEXT_PUBLIC_SELLER_NAME || "Seller"
      : process.env.NEXT_PUBLIC_DUMMY_USER_NAME || "Thrift User";

  const userIdToShow =
    userRole === "admin"
      ? process.env.NEXT_PUBLIC_ADMIN_ID
      : userRole === "seller"
      ? process.env.NEXT_PUBLIC_SELLER_ID
      : process.env.NEXT_PUBLIC_DUMMY_USER_ID;

  const userInitial =
    dummyUserName && dummyUserName.length > 0
      ? dummyUserName.charAt(0).toUpperCase()
      : "U";

  return (
    <>
      <nav className="relative bg-white">
        <div className="mx-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
            <Link
              href="/"
              className="relative text-4xl font-semibold text-slate-700"
            >
              <span className="text-green-600">Thrift</span>Store
              <span className="text-green-600 text-5xl leading-0">.</span>
              <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                plus
              </p>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/">About</Link>
              <Link href="/">Contact</Link>

              <form
                onSubmit={handleSearch}
                className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
              >
                <Search size={18} className="text-slate-600" />
                <input
                  className="w-full bg-transparent outline-none placeholder-slate-600"
                  type="text"
                  placeholder="Search products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
              </form>

              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-slate-600"
              >
                <ShoppingCart size={18} />
                Cart
                <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                  {cartCount}
                </button>
              </Link>

              {/* Right side: Login or Profile */}
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsProfileOpen(false);
                  }}
                  className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                >
                  Login
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-semibold">
                      {userInitial}
                    </div>
                    <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                      {dummyUserName}
                    </span>
                    {userRole && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                        {userRole}
                      </span>
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl border border-slate-100 z-20">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-700 truncate">
                          {dummyUserName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {userIdToShow}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50"
                        onClick={() => {
                          alert("Logged in as Rahul Khichar.");
                        }}
                      >
                        View Profile
                      </button>
                      {/* You can also add My Orders here later if you want */}
                       {/* NEW: My Orders */}
                        <button
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50"
                        onClick={() => router.push("/orders")}
                      >
                        My Orders
                        </button>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile User Button  */}
            <div className="sm:hidden">
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsProfileOpen(false);
                  }}
                  className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-semibold">
                    {userInitial}
                  </div>
                  <span className="max-w-[90px] truncate">{dummyUserName}</span>
                  {userRole && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                      {userRole}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 relative">
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setLoginError("");
              }}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xl leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              ThriftStore Login
            </h2>
            <p className="text-xs text-slate-500 mb-4">
               login for admin / seller / test user
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Login ID
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                  placeholder="Enter login ID"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-500 mt-1">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
              >
                Login
              </button>

              {/* Sign Up (left) & Forgot Password (right) */}
              <div className="flex items-center justify-between text-[10px] mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignupOpen(true);
                    setIsLoginOpen(false);
                    setSignupError("");
                    setSignupSuccess("");
                  }}
                  className="text-Blue-600 hover:underline"
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsForgotOpen(true);
                    setIsLoginOpen(false);
                    setForgotMessage("");
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 relative">
            <button
              onClick={() => {
                setIsForgotOpen(false);
                setForgotEmail("");
                setForgotMessage("");
              }}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xl leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Reset Password
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Enter your email address to receive a password reset link.
              
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {forgotMessage && (
                <p className="text-xs text-green-600 mt-1">{forgotMessage}</p>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
              >
                Send reset link 
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsForgotOpen(false);
                  setIsLoginOpen(true);
                  setForgotMessage("");
                }}
                className="w-full mt-1 py-2 text-[11px] Blue-500 hover:underline"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 relative">
            <button
              onClick={() => {
                setIsSignupOpen(false);
                setSignupError("");
                setSignupSuccess("");
              }}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xl leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Create Account
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Sign up to continue shopping with ThriftStore.
            </p>

            <form onSubmit={handleSignupSubmit} className="space-y-3 mt-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Contact
                </label>
                <input
                  type="tel"
                  value={signupContact}
                  onChange={(e) => setSignupContact(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                  placeholder="Enter your contact number"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                    placeholder="Password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              {signupError && (
                <p className="text-xs text-red-500 mt-1">{signupError}</p>
              )}
              {signupSuccess && (
                <p className="text-xs text-green-600 mt-1">{signupSuccess}</p>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
              >
                Sign Up
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSignupOpen(false);
                  setIsLoginOpen(true);
                  setSignupError("");
                  setSignupSuccess("");
                }}
                className="w-full mt-1 py-2 text-[11px] text-Blue-500 hover:underline"
              >
                Already have an account? Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
