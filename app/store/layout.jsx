import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Thrift Store. - Store Dashboard",
    description: "Thrift Store. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
