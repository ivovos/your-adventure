import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DesignPage() {
    return (
        <div className="container mx-auto py-10 space-y-10 px-6">
            <div className="space-y-4">
                <h1 className="text-4xl font-display font-bold">Design System</h1>
                <p className="text-muted-foreground text-lg">
                    A collection of components and tokens for the Your Adventure app.
                </p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-display font-bold">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorCard name="Primary" className="bg-primary text-primary-foreground" />
                    <ColorCard name="Secondary" className="bg-secondary text-secondary-foreground" />
                    <ColorCard name="Accent" className="bg-accent text-accent-foreground" />
                    <ColorCard name="Destructive" className="bg-destructive text-destructive-foreground" />
                    <ColorCard name="Muted" className="bg-muted text-muted-foreground" />
                    <ColorCard name="Card" className="bg-card text-card-foreground border" />
                    <ColorCard name="Popover" className="bg-popover text-popover-foreground border" />
                    <ColorCard name="Background" className="bg-background text-foreground border" />
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-display font-bold">Typography</h2>
                <div className="space-y-4 p-6 border rounded-xl bg-card">
                    <h1 className="text-5xl font-display font-bold">Heading 1 (Display)</h1>
                    <h2 className="text-4xl font-display font-bold">Heading 2 (Display)</h2>
                    <h3 className="text-3xl font-display font-bold">Heading 3 (Display)</h3>
                    <p className="text-xl font-serif">
                        Body text using the serif font family. This is used for the main story content.
                        It should be readable and comfortable for long reading sessions.
                    </p>
                    <p className="text-sm text-muted-foreground font-sans">
                        Small text or metadata using the sans-serif font family.
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-display font-bold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Default (Primary)</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button size="lg">Large Button</Button>
                    <Button size="default">Default Button</Button>
                    <Button size="sm">Small Button</Button>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-display font-bold">Cards & Inputs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description goes here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Email" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Action</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    )
}

function ColorCard({ name, className }: { name: string, className: string }) {
    return (
        <div className={`p-6 rounded-xl flex flex-col justify-between h-32 ${className}`}>
            <span className="font-bold">{name}</span>
        </div>
    )
}
