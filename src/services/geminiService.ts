import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Vui lòng thiết lập GEMINI_API_KEY trong Settings > Secrets để sử dụng tính năng AI.");
  }
  return new GoogleGenAI({ apiKey });
};

export interface AIConfig {
  tone: "cheerful" | "serious" | "encouraging" | "neutral";
  length: "short" | "medium" | "long";
  avoidKeywords: string[];
  foundationalComments?: string[];
  includeName: boolean;
}

export interface GenerateCommentParams {
  studentName: string;
  subject: string;
  score: number | string;
  level: string;
  period: "GK1" | "CK1" | "GK2" | "CK2" | "CN";
  gradeLevel: string;
  config?: AIConfig;
}

export async function generateAIComment({
  studentName,
  subject,
  score,
  level,
  period,
  gradeLevel,
  config,
}: GenerateCommentParams): Promise<string> {
  const ai = getAI();
  const model = "gemini-3-flash-preview";

  const isMidTerm = period.startsWith("GK");
  const isYearEnd = period === "CN";
  let periodText = isMidTerm ? "Giữa kỳ (ghi nhận tiến bộ bước đầu)" : "Cuối kỳ (đánh giá tổng hợp)";
  if (isYearEnd) periodText = "Tổng kết cuối năm (đánh giá toàn diện cả năm học)";

  const toneMap = {
    cheerful: "Vui vẻ, phấn khởi",
    serious: "Nghiêm túc, chuẩn mực",
    encouraging: "Khích lệ, truyền cảm hứng",
    neutral: "Khách quan, trung tính"
  };

  const lengthMap = {
    short: "Rất ngắn gọn (dưới 15 từ)",
    medium: "Trung bình (15-25 từ)",
    long: "Chi tiết (trên 30 từ)"
  };

  const systemInstruction = `
Bạn là một trợ lý ảo hỗ trợ giáo viên tiểu học Việt Nam viết nhận xét học sinh theo Thông tư 27.
Nhiệm vụ: Tạo một câu nhận xét duy nhất cho học sinh, chân thực và giàu tính khích lệ.

Yêu cầu kỹ thuật:
- Độ dài: ${config ? lengthMap[config.length] : lengthMap.medium}.
- Giọng điệu: ${config ? toneMap[config.tone] : toneMap.encouraging}.
${config?.avoidKeywords?.length ? `- TUYỆT ĐỐI KHÔNG sử dụng các từ sau: ${config.avoidKeywords.join(", ")}.` : ""}

Quy tắc Thông tư 27:
- Giữa kì (GK1, GK2): Tập trung ghi nhận sự tiến bộ bước đầu, những ưu điểm mới.
- Cuối kì (CK1, CK2): Đánh giá tổng hợp sự tiến bộ của cả quá trình kì học.
- Cuối năm (CN): Đánh giá tổng quát toàn bộ quá trình học tập cả năm, nhấn mạnh sự trưởng thành và phát triển của học sinh.
- Mức T/HTT: Khen ngợi tích cực, làm nổi bật sự xuất sắc hoặc sáng tạo.
- Mức H/HT: Ghi nhận sự cố gắng, tiến bộ của học sinh.
- Mức C/CCG: Nhắc nhở nhẹ nhàng, đưa ra lời khuyên cụ thể để khắc phục hạn chế.
- ${config?.includeName ? `Tên học sinh là "${studentName}". Hãy lồng ghép tên em vào câu nhận xét một cách thân thiện.` : `TUYỆT ĐỐI KHÔNG được lồng ghép tên học sinh vào câu nhận xét.`}
- Luôn trả lời bằng Tiếng Việt. TUYỆT ĐỐI KHÔNG dùng từ "Học khá" hoặc "Tiếp thu bài" một cách máy móc. Tránh các cụm từ sáo rỗng như "Hoàn thành các bài tập", "Có ý thức học tập", "Nỗ lực nhiều". Hãy dùng các cụm từ linh hoạt và sinh động hơn như "Nắm vững kiến thức trọng tâm", "Diễn đạt rõ ràng và tự tin", "Có chiều sâu trong tư duy", "Chủ động tham gia xây dựng bài".
${config?.foundationalComments?.length ? `- Sử dụng các ý tưởng và văn phong từ những nhận xét mẫu sau đây làm NỀN TẢNG để sáng tạo (nhưng không chép y hệt): \n${config.foundationalComments.map(c => `  + ${c}`).join('\n')}` : ""}
`;

  const prompt = `
Môn học: ${subject}
Khối: ${gradeLevel}
Thời điểm: ${periodText} (${period})
Điểm số: ${score}
Mức đánh giá (Xếp loại): ${level}

Hãy tạo 1 câu nhận xét phù hợp cho học sinh này.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
}

export async function generateAICommentsBatch(students: GenerateCommentParams[], globalConfig?: AIConfig): Promise<string[]> {
  const ai = getAI();
  const model = "gemini-3-flash-preview";

  const toneMap = {
    cheerful: "Vui vẻ, phấn khởi",
    serious: "Nghiêm túc, chuẩn mực",
    encouraging: "Khích lệ, truyền cảm hứng",
    neutral: "Khách quan, trung tính"
  };

  const lengthMap = {
    short: "Rất ngắn gọn (dưới 15 từ)",
    medium: "Trung bình (15-25 từ)",
    long: "Chi tiết (trên 30 từ)"
  };

  const systemInstruction = `
Bạn là một chuyên gia giáo dục tiểu học tại Việt Nam, am hiểu sâu sắc Thông tư 27/2020/TT-BGDĐT.
Nhiệm vụ: Tạo danh sách nhận xét học sinh cá nhân hóa, tuyệt đối không được lặp lại cấu trúc câu hoặc dùng các mẫu câu giống hệt nhau cho nhiều học sinh.

Yêu cầu kỹ thuật & Sáng tạo:
- Độ dài: ${globalConfig ? lengthMap[globalConfig.length] : lengthMap.medium}.
- Giọng điệu: ${globalConfig ? toneMap[globalConfig.tone] : toneMap.encouraging}.
${globalConfig?.avoidKeywords?.length ? `- TUYỆT ĐỐI KHÔNG sử dụng các từ sau: ${globalConfig.avoidKeywords.join(", ")}.` : ""}
- Trả về mảng JSON ["nhận xét 1", "nhận xét 2", ...].

Quy tắc nội dung (Thông tư 27):
1. Thời điểm & Tính chất:
   - GK1/GK2: Ghi nhận sự tiến bộ, hứng thú ban đầu.
   - CK1/CK2: Tổng kết năng lực, phẩm chất và định hướng lâu dài của học kì.
   - CN (Cuối năm): Đánh giá tổng quát toàn bộ quá trình học tập cả năm, nhấn mạnh sự trưởng thành và phát triển cá nhân.
2. Mức đánh giá & Điểm số:
   - Tốt (T/HTT) & Điểm 9,10: Khen ngợi sự hào hứng, sáng tạo, nắm vững kiến thức nâng cao.
   - Khá - Tốt & Điểm 7,8: Khen ngợi sự chắc chắn, cẩn thận, nắm vững kiến thức và kỹ năng môn học. 
   - Đạt (H/HT) & Điểm 5,6: Ghi nhận sự cố gắng, nhắc nhở rèn luyện thêm một vài kỹ năng cụ thể.
   - Cần cố gắng (C/CCG) & Điểm <5: Nêu giải pháp khắc phục cụ thể, nhẹ nhàng, truyền động lực.

3. Thuật toán Đa dạng (BẮT BUỘC):
   - ${globalConfig?.includeName ? `Luôn đảo thứ tự các thành phần: [Tên em] + [Khen ngợi] + [Tiến tới]; hoặc [Lời khen chung] + [Tên em] + [Điểm sáng cụ thể].` : `TUYỆT ĐỐI KHÔNG được dùng tên học sinh. Hãy tập trung vào đánh giá năng lực và thái độ.`}
   - Sử dụng đa dạng các từ nối: "bên cạnh đó", "đặc biệt em rất", "không chỉ vậy", "cô/thầy nhận thấy", "đáng khen ngợi là".
   - Tránh các cụm từ máy móc như "Tiếp thu bài nhanh", "Có ý thức". Hãy dùng các cách diễn đạt tự nhiên và cụ thể hơn: "Em nắm vững các kĩ năng...", "Thực hành thuần thục...", "Tư duy linh hoạt...", "Biết cách vận dụng kiến thức...".
   - Không được dùng quá 2 lần cùng một kiểu mở đầu trong một danh sách.
${globalConfig?.foundationalComments?.length ? `- LẤY CẢM HỨNG từ phong cách và nội dung của các nhận xét mẫu này để đa dạng hóa câu từ: \n${globalConfig.foundationalComments.map(c => `  + ${c}`).join('\n')}` : ""}
`;

  const prompt = `
Hãy viết nhận xét cho ${students.length} học sinh. PHẢI đảm bảo tính duy nhất cho từng câu.

Dữ liệu học sinh:
${students.map((s, idx) => `
ID ${idx}${globalConfig?.includeName ? ` - ${s.studentName}` : ""}:
- Môn: ${s.subject} (${s.gradeLevel})
- Mức: ${s.level}, Điểm: ${s.score}, Kỳ: ${s.period}`).join('\n')}

Yêu cầu: Trả về mảng JSON đúng thứ tự ID. Nhận xét phải sắc sảo, đúng trình độ tiểu học.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini AI Batch Error:", error);
    throw error;
  }
}
