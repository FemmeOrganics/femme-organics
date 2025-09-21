"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableCell, TableRow } from "@/src/components/ui/table"
import { useAuth } from "@/src/lib/customer-auth"

export const Account = () => {
    const {user} = useAuth()
    console.log(user)
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-1.5xl">
                    Your account information
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <Table>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            {user?.name}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Phone Number
                        </TableCell>
                        <TableCell>
                            {user?.phoneNumber ??" N/A"}
                        </TableCell>
                    </TableRow>
                </Table>
            </CardContent>
        </Card>
    )
}