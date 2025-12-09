import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Thrift Store. - Admin",
    description: "Thrift Store. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
