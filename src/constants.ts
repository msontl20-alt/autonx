export const competenciesGood = [
  "Em có ý thức tự giác cao trong học tập, trao đổi ý kiến cùng bạn rất tốt.",
  "Em biết cách nêu câu hỏi và tự trả lời, thể hiện sự hòa đồng với bạn bè.",
  "Em biết vận dụng kiến thức đã học vào cuộc sống, diễn đạt rõ ràng, dễ hiểu.",
  "Em tự tin trong giải quyết nhiệm vụ được giao, biết chia sẻ với bạn.",
  "Em có khả năng tổ chức làm việc theo nhóm tốt, biết lắng nghe ý kiến.",
  "Em phối hợp tốt với các bạn, có khả năng tự điều khiển hoạt động nhóm.",
  "Em vận dụng tốt những điều đã học để giải quyết nhiệm vụ học tập sáng tạo."
];

export const competenciesFair = [
  "Em biết tự thực hiện các nhiệm vụ học tập, biết hợp tác nhóm.",
  "Em bước đầu biết tự học, biết tìm kiếm sự trợ giúp của thầy cô, bạn bè.",
  "Em biết giao tiếp, hợp tác với bạn, có ý thức xây dựng bài mới.",
  "Em có khả năng báo cáo kết quả làm việc của nhóm với giáo viên.",
  "Em tự giác thực hiện nhiệm vụ học, biết lắng nghe người khác."
];

export const competenciesPoor = [
  "Em cần có ý thức tự giác hơn trong học tập và mạnh dạn giao tiếp.",
  "Em chưa mạnh dạn trong giao tiếp, hợp tác, cần tích cực trao đổi ý kiến.",
  "Em nên tự giác hơn trong việc học, cần tích cực hợp tác với nhóm.",
  "Khả năng tự giải quyết các vấn đề em còn cần nhiều sự trợ giúp.",
  "Em cần mạnh dạn, tự tin hơn khi phát biểu ý kiến trước lớp."
];

export const qualitiesGood = [
  "Em tôn trọng và quý mến thầy cô, bạn bè, có tấm lòng nhân ái.",
  "Em tự giác, tích cực tham gia các hoạt động tập thể của lớp, trường.",
  "Em có ý thức tự giác cao, trung thực trong học tập, biết bảo vệ của công.",
  "Em tự tin trong học tập, trung thực, đoàn kết và yêu quý bạn bè.",
  "Em chăm, ngoan, lễ phép, chấp hành rất tốt nội quy lớp học.",
  "Em có tính trung thực cao, biết giữ lời hứa và sẵn sàng giúp đỡ bạn bè.",
  "Em yêu thương gia đình, kính trọng thầy cô và hoà đồng với tập thể."
];

export const qualitiesFair = [
  "Em biết giúp đỡ bạn khó khăn, vâng lời thầy cô, yêu quý bạn bè.",
  "Em có ý thức giữ trật tự, không làm việc riêng trong giờ học.",
  "Em đi học đều và đúng giờ, có ý thức trong học tập.",
  "Em trung thực trong mọi hoạt động, biết nhận lỗi khi làm sai.",
  "Em có ý thức bảo vệ của công, giữ gìn và bảo vệ môi trường."
];

export const qualitiesPoor = [
  "Em cần tự giác hơn trong học tập, tích cực tham gia giữ vệ sinh lớp học.",
  "Em nên cởi mở và đoàn kết cùng bạn bè nhiều hơn.",
  "Em cần chú ý chấp hành nội quy lớp học và tập trung nghe giảng.",
  "Em nên tích cực tham gia các hoạt động trường lớp hơn nữa."
];

export const FOUNDATIONAL_SAMPLES = [
  { text: "Nắm vững kiến thức trọng tâm, tính toán nhanh và chính xác. Cần phát huy sự sáng tạo trong giải toán có lời văn.", category: "Học tập" },
  { text: "Đọc to, rõ ràng, diễn cảm. Câu văn giàu hình ảnh và cảm xúc, thể hiện sự am hiểu sâu sắc về nội dung bài học.", category: "Học tập" },
  { text: "Tự giác, tích cực trong các hoạt động nhóm, luôn sẵn lòng giúp đỡ bạn bè xung quanh.", category: "Rèn luyện" },
  { text: "Cần chú ý rèn chữ viết cẩn thận hơn và tập trung nghe giảng để nắm chắc kiến thức căn bản.", category: "Nhắc nhở" },
  { text: "Em có tư duy logic tốt, tiếp thu bài nhanh và luôn hoàn thành xuất sắc các nhiệm vụ được giao.", category: "Khen ngợi" }
];

export const ALL_SUBJECTS_BANK: Record<string, Record<string, Record<string, string[]>>> = {
  "Toán": {
    "general": {
      excellent: [
        "Thực hiện tốt các phép tính và giải toán chính xác, nhanh nhẹn.",
        "Vận dụng tốt kiến thức toán học vào thực hành và giải quyết tình huống thực tế.",
        "Có tư duy toán học tốt, trình bày bài khoa học và đầy đủ.",
        "Hoàn thành tốt nội dung chương trình môn Toán trong năm học.",
        "Tích cực tham gia xây dựng bài, có nhiều tiến bộ nổi bật.",
        "Kỹ năng tính toán chính xác, biết trình bày bài khoa học.",
        "Thông minh, tiếp thu bài nhanh, giải toán đúng và đầy đủ."
      ],
      good: [
        "Thực hiện đầy đủ các phép tính và bài toán cơ bản một cách tự tin.",
        "Có nhiều cố gắng trong học tập và rèn luyện kĩ năng tính toán.",
        "Biết xác định yêu cầu bài toán và chủ động hoàn thành các bài tập.",
        "Hoàn thành nội dung chương trình môn học trong năm học.",
        "Có tiến bộ trong kỹ năng giải toán và trình bày bài tương đối đầy đủ.",
        "Tham gia học tập đầy đủ, có ý thức luyện tập thường xuyên."
      ],
      poor: [
        "Cần luyện thêm kỹ năng tính toán và giải toán có lời văn.",
        "Cần chú ý trình bày bài cẩn thận và khoa học hơn.",
        "Cần đọc kỹ đề bài trước khi làm bài tập, hạn chế nhầm lẫn.",
        "Cần tập trung hơn khi làm bài và mạnh dạn trao đổi khi chưa hiểu.",
        "Cần chăm chỉ luyện tập thường xuyên hơn để nâng cao kết quả."
      ]
    }
  },
  "Tiếng Việt": {
    "general": {
      excellent: [
        "Đọc lưu loát, diễn đạt rõ ràng và hiểu tốt nội dung bài học.",
        "Viết đúng chính tả, trình bày bài sạch đẹp; dùng từ đặt câu phù hợp.",
        "Có kỹ năng nghe, nói, đọc, viết tốt; hoàn thành tốt nội dung chương trình.",
        "Biết vận dụng kiến thức Tiếng Việt vào giao tiếp và học tập hằng ngày.",
        "Có nhiều tiến bộ nổi bật, tích cực tham gia phát biểu xây dựng bài.",
        "Đọc to, rõ ràng và trả lời tốt các câu hỏi bài học.",
        "Viết chữ đều nét, trình bày sạch đẹp, vốn từ phong phú.",
        "Hiểu tốt nội dung bài đọc, diễn đạt trôi chảy, mạch lạc."
      ],
      good: [
        "Đọc tốt các ngữ liệu và nắm vững nội dung cơ bản của bài học.",
        "Viết đúng chính tả đúng độ cao, hoàn thành tốt các nhiệm vụ được giao.",
        "Có cố gắng trong học tập và từng bước nâng cao kỹ năng đọc viết.",
        "Hoàn thành nội dung chương trình môn học trong năm học.",
        "Có ý thức rèn luyện kỹ năng sử dụng Tiếng Việt, trình bày bài sạch đẹp.",
        "Đọc tương đối rõ ràng, biết trả lời các câu hỏi đơn giản."
      ],
      poor: [
        "Cần luyện đọc thường xuyên hơn để nâng cao tốc độ và khả năng đọc hiểu.",
        "Cần chú ý viết đúng chính tả và trình bày bài cẩn thận hơn.",
        "Cần mạnh dạn hơn trong giao tiếp và phát biểu xây dựng bài.",
        "Cần rèn thêm kỹ năng diễn đạt câu và viết đoạn văn.",
        "Cần tập trung hơn trong giờ học và hoàn thành bài tập đầy đủ hơn."
      ]
    }
  },
  "Tin học": {
    "general": {
      excellent: [
        "Thao tác tốt với chuột, bàn phím và các phần mềm học tập.",
        "Hoàn thành tốt các bài thực hành; sử dụng máy tính đúng cách, an toàn.",
        "Gõ bàn phím nhanh, chính xác; chủ động thực hiện các thao tác.",
        "Có kỹ năng sử dụng máy tính tốt, tích cực tham gia giờ học thực hành.",
        "Hoàn thành tốt nội dung chương trình môn Tin học trong năm học."
      ],
      good: [
        "Thực hiện được các thao tác cơ bản trên máy tính theo hướng dẫn.",
        "Hoàn thành các bài thực hành cơ bản; có cố gắng trong quá trình học tập.",
        "Biết mở và tắt phần mềm đúng cách, có ý thức giữ gìn thiết bị.",
        "Tham gia học tập đầy đủ, có tiến bộ trong kỹ năng thực hành.",
        "Hoàn thành nội dung chương trình môn học trong năm học."
      ],
      poor: [
        "Cần luyện thêm kỹ năng sử dụng chuột và bàn phím (đúng quy tắc gõ).",
        "Cần thao tác cẩn thận hơn khi thực hành và tích cực phát biểu.",
        "Cần tập trung hơn khi sử dụng máy tính, tránh làm việc riêng.",
        "Cần mạnh dạn trao đổi khi chưa hiểu bài để hoàn thành bài thực hành.",
        "Cần chăm chỉ luyện tập thêm để nâng cao kỹ năng sử dụng máy tính."
      ]
    }
  },
  "Đạo đức": {
    "general": {
      excellent: [
        "Lễ phép với thầy cô và người lớn; đoàn kết, giúp đỡ bạn bè.",
        "Thực hiện tốt nội quy trường lớp và giữ gìn vệ sinh chung.",
        "Biết vận dụng bài học đạo đức vào thực tế cuộc sống.",
        "Có tinh thần trách nhiệm, trung thực và tích cực tham gia hoạt động tập thể.",
        "Có kỹ năng ứng xử phù hợp, có ý thức bảo vệ môi trường.",
        "Trung thực trong học tập và sinh hoạt, là tấm gương sáng cho bạn bè."
      ],
      good: [
        "Thực hiện tốt các yêu cầu cơ bản của môn học.",
        "Có ý thức học tập, rèn luyện đạo đức và phân biệt được hành vi đúng sai.",
        "Tham gia đầy đủ các hoạt động học tập, có cố gắng rèn luyện bản thân.",
        "Biết hợp tác với bạn, lắng nghe và thực hiện theo hướng dẫn.",
        "Hoàn thành nội dung chương trình môn học trong năm học."
      ],
      poor: [
        "Cần mạnh dạn hơn khi tham gia các hoạt động tập thể và nhóm.",
        "Cần thực hiện tốt hơn nội quy trường lớp và giữ vệ sinh cá nhân.",
        "Cần chủ động hơn trong học tập và rèn luyện bản thân.",
        "Cần biết chia sẻ, giúp đỡ và lắng nghe ý kiến của bạn bè.",
        "Cần tự giác hơn trong học tập và rèn kỹ năng giao tiếp lịch sự."
      ]
    }
  },
  "Tự nhiên và Xã hội": {
    "general": {
      excellent: [
        "Nắm vững kiến thức cơ bản và vận dụng tốt kiến thức vào thực tế.",
        "Có khả năng quan sát, nhận xét và suy luận về các sự vật hiện tượng tốt.",
        "Tích cực tham gia học tập, có tinh thần tìm tòi và khám phá.",
        "Biết giữ gìn sức khỏe, vệ sinh cá nhân và bảo vệ môi trường sống.",
        "Hoàn thành tốt nội dung chương trình môn học trong năm học."
      ],
      good: [
        "Nắm vững nội dung cơ bản của bài học, tham gia tích cực hoạt động nhóm.",
        "Hoàn thành tốt các bài tập, có nhiều cố gắng trong học tập.",
        "Có tiến bộ trong nhận thức bài học và vận dụng vào thực tế đơn giản.",
        "Hoàn thành nội dung chương trình môn học trong năm học."
      ],
      poor: [
        "Cần chú ý ghi nhớ kiến thức bài học và hoàn thành bài tập đầy đủ hơn.",
        "Cần mạnh dạn phát biểu và tích cực tham gia xây dựng bài.",
        "Cần tập trung hơn khi học bài và chủ động tìm hiểu kiến thức mới.",
        "Cần ôn tập thêm để nắm vững các sự vật, hiện tượng trong tự nhiên.",
        "Cần cố gắng hơn trong các hoạt động khám phá và thảo luận nhóm."
      ]
    }
  },
  "Khoa học": {
    "general": {
      excellent: [
        "Hiểu bài sâu sắc, biết vận dụng kiến thức khoa học vào thực tế.",
        "Có kỹ năng quan sát, thực hành và làm thí nghiệm tốt.",
        "Tích cực tham gia hoạt động học tập, có tinh thần tìm tòi khám phá.",
        "Chủ động nắm bắt và ghi nhớ kiến thức khoa học tự nhiên rất tốt.",
        "Hoàn thành tốt nội dung chương trình môn học trong năm học."
      ],
      good: [
        "Nắm được kiến thức cơ bản, hoàn thành các bài tập và thực hành cơ bản.",
        "Có cố gắng trong học tập, có tiến bộ trong kỹ năng quan sát thực tế.",
        "Biết phối hợp với bạn bè trong các hoạt động học tập trải nghiệm.",
        "Hoàn thành nội dung chương trình môn học trong năm học."
      ],
      poor: [
        "Cần ôn tập lại các kiến thức đã học và chú ý ghi nhớ nội dung bài.",
        "Cần mạnh dạn hơn khi tham gia hoạt động nhóm và thí nghiệm.",
        "Cần tích cực phát biểu xây dựng bài và tập trung nghe giảng.",
        "Cần chăm chỉ học bài và rèn luyện kỹ năng quan sát hiện tượng.",
        "Cần cố gắng hoàn thành đầy đủ các nhiệm vụ học tập môn Khoa học."
      ]
    }
  },
  "Lịch sử và Địa lí": {
    "general": {
      excellent: [
        "Nắm vững kiến thức lịch sử, địa lí; biết vận dụng liên hệ thực tế.",
        "Có kỹ năng quan sát bản đồ, tranh ảnh và ghi nhớ sự kiện tốt.",
        "Tích cực tham gia xây dựng bài, hoàn thành tốt các nhiệm vụ học tập.",
        "Tiếp thu nhanh, ghi nhớ các đặc điểm địa lí và mốc lịch sử rất tốt.",
        "Hoàn thành tốt nội dung chương trình môn học trong năm học."
      ],
      good: [
        "Nắm vững kiến thức cơ bản của môn học, có tinh thần tự giác trong học tập.",
        "Hoàn thành tốt các bài tập; biết xác định nội dung trên bản đồ.",
        "Có tiến bộ trong học tập và tham gia thảo luận các vấn đề lịch sử.",
        "Hoàn thành nội dung chương trình môn học trong năm học."
      ],
      poor: [
        "Cần chú ý ghi nhớ các sự kiện lịch sử và đặc điểm địa lí cơ bản.",
        "Cần luyện thêm kỹ năng quan sát bản đồ, sơ đồ và tranh ảnh.",
        "Cần mạnh dạn phát biểu ý kiến và tích cực tham gia xây dựng bài.",
        "Cần chăm chỉ học bài thường xuyên hơn để nắm vững kiến thức.",
        "Cần tập trung nghe giảng để hiểu rõ các mối quan hệ địa lí, lịch sử."
      ]
    }
  },
  "Công nghệ": {
    "general": {
      excellent: [
        "Biết sử dụng dụng cụ học tập đúng cách, an toàn và hiệu quả.",
        "Thực hiện tốt các yêu cầu thực hành, thao tác khéo léo và cẩn thận.",
        "Nắm vững kiến thức công nghệ, vận dụng linh hoạt vào các sản phẩm.",
        "Tích cực tham gia các hoạt động thực hành, có ý thức giữ gìn sản phẩm.",
        "Hoàn thành tốt nội dung chương trình môn học trong năm học."
      ],
      good: [
        "Thực hiện được các thao tác cơ bản theo hướng dẫn của giáo viên.",
        "Nắm vững các kĩ năng thực hành cơ bản; có tinh thần tự giác cao.",
        "Biết sử dụng dụng cụ học tập phù hợp, có tiến bộ trong thực hành.",
        "Hoàn thành nội dung chương trình môn học trong năm học."
      ],
      poor: [
        "Cần thao tác cẩn thận và thực hiện đúng quy trình khi thực hành.",
        "Cần chuẩn bị đầy đủ dụng cụ học tập và tích cực tham gia giờ học.",
        "Cần tập trung nghe hướng dẫn để tránh nhầm lẫn khi làm sản phẩm.",
        "Cần chăm chỉ luyện tập thêm để nâng cao kỹ năng khéo léo.",
        "Cần cố gắng hoàn thành tốt các nhiệm vụ thực hành được giao.",
      ]
    }
  },
  "Hoạt động trải nghiệm": {
    "general": {
      excellent: [
        "Tích cực tham gia các hoạt động trải nghiệm và hoạt động tập thể.",
        "Có kỹ năng hợp tác, giao tiếp và làm việc nhóm rất tốt.",
        "Biết vận dụng kỹ năng sống vào thực tế; chủ động thực hiện nhiệm vụ.",
        "Mạnh dạn, tự tin tham gia khám phá bản thân và môi trường xung quanh.",
        "Có tinh thần trách nhiệm và ý thức tập thể cao trong công việc được giao."
      ],
      good: [
        "Tích cực tham gia các hoạt động trải nghiệm cùng bạn bè.",
        "Biết hợp tác với bạn trong hoạt động nhóm, có cố gắng hoàn thành nhiệm vụ.",
        "Có tiến bộ trong giao tiếp và thực hiện các kỹ năng sống cơ bản.",
        "Hoàn thành tốt nhiệm vụ học tập theo nội dung chương trình trong năm học.",
        "Biết lắng nghe hướng dẫn và có tinh thần học tập tích cực."
      ],
      poor: [
        "Cần mạnh dạn và tự tin hơn khi tham gia các hoạt động tập thể.",
        "Cần tích cực và chủ động hơn trong thực hiện nhiệm vụ được giao.",
        "Cần rèn thêm kỹ năng giao tiếp, hợp tác và làm việc nhóm.",
        "Cần chú ý thực hiện nhiệm vụ đầy đủ và tự giác hơn.",
        "Cần cố gắng rèn luyện kỹ năng tự phục vụ và kỹ năng sống cơ bản."
      ]
    }
  },
  "Âm nhạc": {
    "general": {
      excellent: [
        "Hát đúng giai điệu, lời ca và kết hợp vận động phụ họa phù hợp.",
        "Có giọng hát rõ ràng, tự tin biểu diễn trước tập thể; thuộc lời nhanh.",
        "Tích cực tham gia các hoạt động âm nhạc, cảm thụ âm nhạc tốt.",
        "Biểu diễn tự nhiên, sinh động, hoàn thành tốt nội dung chương trình."
      ],
      good: [
        "Thuộc lời bài hát và hát đúng nhịp ở mức cơ bản.",
        "Có cố gắng trong luyện hát và tham gia các hoạt động âm nhạc.",
        "Nắm vững các kĩ năng cơ bản của môn học, tham gia học tập tích cực.",
        "Có tiến bộ trong kỹ năng biểu diễn và gõ đệm nhịp nhàng."
      ],
      poor: [
        "Cần luyện hát rõ lời, đúng giai điệu và giữ đúng nhịp bài hát.",
        "Cần mạnh dạn hơn khi tham gia biểu diễn trước lớp.",
        "Cần tự tin hơn và tích cực tham gia các hoạt động tập thể.",
        "Cần luyện tập thêm các động tác phụ họa cho bài hát.",
        "Cần tập trung và chăm chỉ hơn trong các giờ học âm nhạc."
      ]
    }
  },
  "Mĩ thuật": {
    "general": {
      excellent: ["Khéo tay, luôn hoàn thành bài vẽ/sản phẩm nhanh, đẹp, có sáng tạo.", "Biết chọn lọc màu sắc hài hoà, có mắt thẩm mỹ tốt, thể hiện ý tưởng phong phú và sáng tạo."],
      good: ["Thực hiện sản phẩm đúng kĩ thuật, biết mô tả hình ảnh, màu sắc đẹp.", "Nắm vững cách thực hành và sáng tạo được sản phẩm đạt chất lượng tốt."],
      fair: ["Hoàn thành bài tập mĩ thuật cơ bản, cần tô màu đều nét hơn.", "Sản phẩm đảm bảo các tiêu chí nhưng cần thêm sự sáng tạo và cẩn thận."],
      poor: ["Chưa hoàn thành sản phẩm mĩ thuật, nét vẽ còn lúng túng.", "Chưa có ý thức chuẩn bị đồ dùng học tập vẽ."]
    }
  },
  "Giáo dục thể chất": {
    "general": {
      excellent: ["Thực hiện tốt các bài tập thể dục, tham gia tích cực, nhiệt tình các trò chơi.", "Hoàn thành tốt lượng vận động, tác phong nhanh nhẹn, khỏe mạnh."],
      good: ["Có ý thức rèn luyện tốt, tham gia đầy đủ các hoạt động vận động.", "Biết tự giác tập luyện, chơi trò chơi tích cực và đúng luật."],
      fair: ["Thực hiện được cơ bản các động tác, cần cố gắng nhanh nhẹn hơn.", "Có tham gia vận động nhưng đôi khi chưa thực sự chú ý tư thế."],
      poor: ["Chưa hoàn thành động tác thể dục, cần tự giác rèn luyện nhiều hơn.", "Chưa tích cực tham gia các trò chơi vận động tập thể."]
    }
  },
  "Tiếng Anh": {
    "general": {
      excellent: ["Sử dụng Tiếng Anh hiệu quả, nghe và phản hồi cực tốt trong giao tiếp.", "Nắm vững kiến thức, tự tin nói các cụm từ/câu đơn giản lưu loát."],
      good: ["Nắm vững kiến thức Tiếng Anh, giao tiếp tốt trong ngữ cảnh quen thuộc.", "Thể hiện sự hứng thú, hoàn thành tốt các bài nghe và nói Tiếng Anh."],
      fair: ["Nắm được kiến thức Tiếng Anh cơ bản, có thể giao tiếp ở mức đơn giản.", "Hoàn thành đầy đủ bài tập Tiếng Anh nhưng cần rèn thêm kỹ năng nghe."],
      poor: ["Gặp nhiều khó khăn trong việc tiếp thu từ vựng và giao tiếp Tiếng Anh.", "Chưa thể hiện được kiến thức và kỹ năng Tiếng Anh cơ bản."]
    }
  },
  "Hướng nghiệp": {
    "general": {
      excellent: ["// Placeholder: Excellent", "Em có định hướng nghề nghiệp rõ ràng, chủ động tìm hiểu các thông tin về ngành nghề."],
      good: ["// Placeholder: Good", "Em bắt đầu có ý thức về việc chọn hướng đi cho tương lai, tích cực tham gia các buổi tư vấn."],
      fair: ["// Placeholder: Fair", "Em có tham gia các hoạt động hướng nghiệp nhưng chưa thực sự xác định rõ mục tiêu."],
      poor: ["// Placeholder: Poor", "Em cần quan tâm hơn đến việc tìm hiểu các ngành nghề và định hướng tương lai của mình."]
    }
  }
};

