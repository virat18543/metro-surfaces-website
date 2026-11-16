import { social } from "@/lib/site";
import { findMember, memberVcard, team } from "@/lib/team";

export const dynamicParams = false;

export function generateStaticParams() {
  return team.map((member) => ({ code: member.code }));
}

/**
 * metrosurfaces.in/<code>/contact.vcf
 *
 * Served inline as text/vcard so iPhone Safari opens it as a contact card
 * ("Create New Contact") instead of downloading a file.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const member = findMember(code);
  if (!member) return new Response("Not found", { status: 404 });

  const filename = `${member.name} - Acrycore by Metro`.replace(/[^A-Za-z0-9]+/g, "-");

  return new Response(memberVcard(member, [...social]), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${filename}.vcf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
