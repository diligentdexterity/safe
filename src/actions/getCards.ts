import db from "@/lib/db";
import { decrypt } from "@/lib/encryption";
import { Card } from "@prisma/client";

export default async function getCards(email: string, masterPassword: string): Promise<Card[] | null> {
  try {
    if (!email) {
      console.log("getCards-Invalid_Email");
      return null;
    }

    const cards: Card[] | null = await db.card.findMany({
      where: {
        userEmail: email,
      },
      include: {
        category: true,
        customFields: true,
      },
    });

    if (cards) {
      let decryptedCards: Card[] = [];
      cards.map((card) => {
        decryptedCards.push({
          ...card,
          cardNumber: decrypt(card.cardNumber, masterPassword) || "",
          note: decrypt(card.note, masterPassword) || "",
          cvv: decrypt(card.cvv, masterPassword) || "",
        });
      });
      return decryptedCards;
    }

    return null;
  } catch (error) {
    console.log("GET_CARDS_ERROR = ", error);
    return null;
  }
}
