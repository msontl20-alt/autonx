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
        "Thực hiện tốt các phép tính và bài toán hằng ngày.",
        "Có kỹ năng tính toán nhanh và chính xác.",
        "Biết trình bày bài khoa học, rõ ràng và đầy đủ.",
        "Vận dụng tốt kiến thức toán học vào thực hành và thực tế.",
        "Có tư duy toán học tốt; giải toán đúng và đủ các bước.",
        "Tự giác học tập và tích cực tham gia xây dựng bài.",
        "Có tiến bộ rõ rệt và hoàn thành tốt nội dung chương trình môn Toán năm học."
      ],
      good: [
        "Thực hiện được các phép tính và bài toán cơ bản.",
        "Hoàn thành các bài tập được giao; có ý thức học tập.",
        "Biết xác định đúng trọng tâm bài toán và giải toán nhanh.",
        "Có tiến bộ trong kỹ năng tính toán và trình bày bài.",
        "Biết trình bày bài tương đối đầy đủ và sạch đẹp."
      ],
      fair: [
        "Thực hiện được các phép tính cơ bản theo hướng dẫn.",
        "Tham gia học tập đầy đủ; có ý thức luyện tập thường xuyên.",
        "Từng bước nắm vững các kỹ năng tính toán trọng tâm.",
        "Biết xác định nội dung cơ bản của các bài tập toán.",
        "Hoàn thành nội dung học tập ở mức cơ bản hằng ngày."
      ],
      poor: [
        "Cần luyện thêm kỹ năng tính toán và giải toán có lời văn.",
        "Cần đọc kỹ đề bài trước khi làm bài để tránh nhầm lẫn.",
        "Cần trình bày bài cẩn thận hơn và đặt tính đúng cột.",
        "Cần tập trung hơn khi làm bài; mạnh dạn trao đổi khi chưa hiểu.",
        "Cần chú ý ôn tập kiến thức cũ để nắm vững bài học mới hằng ngày."
      ]
    }
  },
  "Tiếng Việt": {
    "general": {
      excellent: [
        "Đọc lưu loát, ngắt nghỉ hợp lí và hiểu tốt nội dung bài đọc.",
        "Viết chữ đều nét, đúng chính tả, trình bày sạch đẹp.",
        "Biết dùng từ đặt câu phù hợp và diễn đạt rõ ràng.",
        "Có kỹ năng nghe, nói, đọc, viết tốt và vốn từ phong phú.",
        "Tích cực tham gia phát biểu xây dựng bài; hiểu bài nhanh.",
        "Biết vận dụng từ ngữ sinh động khi viết câu, đoạn văn.",
        "Hoàn thành tốt nội dung chương trình môn học năm học."
      ],
      good: [
        "Đọc to, rõ ràng và trả lời tốt các câu hỏi bài học.",
        "Viết đúng chính tả ở mức cơ bản, trình bày bài sạch sẽ.",
        "Hoàn thành các bài tập được giao; có tiến bộ trong học tập.",
        "Biết trả lời câu hỏi và nắm được nội dung trọng tâm bài.",
        "Từng bước nâng cao kỹ năng đọc và viết câu hoàn chỉnh."
      ],
      fair: [
        "Đọc được bài trôi chảy và trả lời câu hỏi đơn giản.",
        "Tham gia học tập đầy đủ; nỗ lực trong luyện đọc và viết.",
        "Biết trình bày bài ở mức tương đối sạch đẹp và đầy đủ.",
        "Có ý thức rèn luyện kỹ năng sử dụng tiếng Việt hằng ngày.",
        "Theo kịp tiến độ học tập và yêu cầu của chương trình lớp."
      ],
      poor: [
        "Cần luyện đọc nhiều hơn để nâng cao tốc độ và khả năng đọc hiểu.",
        "Cần viết chữ cẩn thận hơn, chú ý viết đúng chính tả.",
        "Cần mạnh dạn phát biểu ý kiến và trao đổi cùng bạn.",
        "Cần rèn luyện thêm kỹ năng dùng dấu câu và ngắt nghỉ đúng.",
        "Cần chú ý trình bày bài sạch đẹp và cẩn thận hơn nữa."
      ]
    }
  },
  "Tin học": {
    "general": {
      excellent: [
        "Thao tác tốt với chuột, bàn phím và các phần mềm học tập.",
        "Hoàn thành tốt các bài thực hành; nắm vững nội dung chương trình.",
        "Biết sử dụng máy tính đúng cách, an toàn và hiệu quả.",
        "Gõ bàn phím nhanh, chính xác; chủ động thực hiện các thao tác.",
        "Biết sử dụng phần mềm học tập hiệu quả, sáng tạo.",
        "Có kỹ năng sử dụng máy tính tốt; tích cực tham gia giờ thực hành.",
        "Nắm vững kĩ năng thực hành, đạt kết quả học tập vượt trội."
      ],
      good: [
        "Thực hiện được các thao tác cơ bản trên máy tính thành thạo.",
        "Thực hiện tốt các bài thực hành cơ bản của bài học.",
        "Biết mở và tắt phần mềm đúng cách; có ý thức giữ gìn máy.",
        "Nghe hướng dẫn và thực hiện thao tác đúng theo giáo viên.",
        "Có cố gắng trong học tập và rèn luyện kỹ năng tin học."
      ],
      fair: [
        "Tham gia học tập đầy đủ; thực hiện được một số thao tác cơ bản.",
        "Biết sử dụng chuột và bàn phím theo hướng dẫn của thầy cô.",
        "Có ý thức giữ gìn thiết bị và rèn luyện trong giờ thực hành.",
        "Theo kịp bài học và hoàn thành các bài tập ở mức cơ bản.",
        "Nắm được các quy tắc an toàn khi sử dụng máy tính cơ bản."
      ],
      poor: [
        "Cần luyện thêm kỹ năng sử dụng chuột và bàn phím đúng quy tắc.",
        "Cần thao tác cẩn thận hơn khi thực hành; chú ý quy tắc gõ.",
        "Cần tập trung hơn khi sử dụng máy tính, tránh làm việc riêng.",
        "Cần mạnh dạn trao đổi khi chưa hiểu bài thực hành của mình.",
        "Cần luyện tập thêm kỹ năng gõ phím và chuẩn bị đầy đủ đồ dùng."
      ]
    }
  },
  "Đạo đức": {
    "general": {
      excellent: [
        "Lễ phép với thầy cô và người lớn; đoàn kết, giúp đỡ bạn bè.",
        "Thực hiện tốt nội quy trường lớp và giữ gìn vệ sinh chung.",
        "Biết vận dụng bài học đạo đức vào thực tế cuộc sống sinh động.",
        "Có tinh thần trách nhiệm, trung thực và tích cực tham gia tập thể.",
        "Ứng xử phù hợp trong các tình huống; có ý thức bảo vệ môi trường.",
        "Nắm vững kiến thức đạo đức và rèn luyện bản thân xuất sắc.",
        "Là tấm gương sáng cho bạn bè về tính trung thực và trách nhiệm."
      ],
      good: [
        "Nắm vững nội dung bài học và thực hiện đúng sự hướng dẫn của giáo viên.",
        "Có ý thức học tập và rèn luyện; biết phân biệt đúng sai.",
        "Tham gia đầy đủ các hoạt động học tập và sinh hoạt lớp.",
        "Biết hợp tác với bạn và lắng nghe ý kiến đóng góp xung quanh.",
        "Nỗ lực thực hiện tốt các nhiệm vụ và nội dung học tập môn học."
      ],
      fair: [
        "Thực hiện được các chuẩn mực đạo đức cơ bản theo bài học.",
        "Có ý thức giữ gìn đồ dùng học tập và vệ sinh cá nhân.",
        "Theo kịp nội dung bài; có sự tiến bộ trong giao tiếp ứng xử.",
        "Biết vâng lời thầy cô và cư xử hòa nhã với bạn bè lớp.",
        "Nắm vững các bài tập hằng ngày ở mức độ cơ bản nhất."
      ],
      poor: [
        "Cần mạnh dạn hơn khi tham gia các hoạt động tập thể, nhóm.",
        "Cần thực hiện tốt nội quy trường lớp và giữ vệ sinh cá nhân.",
        "Cần chú ý lắng nghe ý kiến của bạn và chia sẻ cùng mọi người.",
        "Cần tự giác hơn trong học tập và rèn luyện kỹ năng tự phục vụ.",
        "Cần mạnh dạn trao đổi với bạn bè và thầy cô khi gặp khó khăn."
      ]
    }
  },
  "Tự nhiên và Xã hội": {
    "general": {
      excellent: [
        "Nắm vững kiến thức cơ bản và vận dụng tốt kiến thức vào thực tế.",
        "Có khả năng quan sát, nhận xét và tìm hiểu sự vật hiện tượng tốt.",
        "Tích cực tham gia các hoạt động học tập; ham học hỏi, tìm tòi.",
        "Biết giữ gìn sức khỏe; có ý thức bảo vệ môi trường sống sạch đẹp.",
        "Có khả năng tư duy và trình bày kiến thức tự nhiên mạch lạc.",
        "Tiếp thu bài nhanh và luôn hoàn thành tốt nhiệm vụ được giao.",
        "Nắm chắc các nội dung chương trình học trong cả năm học."
      ],
      good: [
        "Nắm được kiến thức cơ bản của bài học; trả lời được câu hỏi.",
        "Hoàn thành các bài tập theo yêu cầu; có tiến bộ trong nhận thức.",
        "Biết tham gia hoạt động nhóm và trao đổi cùng các bạn.",
        "Có ý thức quan sát và ghi nhớ kiến thức tự nhiên hằng ngày.",
        "Hoàn thành nội dung học tập và vận dụng bài học vào cuộc sống."
      ],
      fair: [
        "Theo kịp tiến độ học tập; hoàn thành các bài tập ở mức cơ bản.",
        "Có sự cố gắng trong rèn luyện và nắm bắt tri thức mới.",
        "Tham gia các hoạt động giáo dục trên lớp theo hướng dẫn.",
        "Biết quan sát tranh ảnh và các đối tượng tự nhiên xung quanh.",
        "Nắm vững các kiến thức cốt lõi của môn học theo chương trình."
      ],
      poor: [
        "Cần chú ý ghi nhớ kiến thức bài học hơn và tập trung học tập.",
        "Cần mạnh dạn phát biểu ý kiến hơn trong các giờ học chung.",
        "Cần tập trung khi học bài; chủ động tìm hiểu nội dung bài học.",
        "Cần cố gắng hoàn thành bài tập đầy đủ hơn mỗi ngày.",
        "Cần ôn tập thêm để nắm vững các sự vật và hiện tượng hằng ngày."
      ]
    }
  },
  "Khoa học": {
    "general": {
      excellent: [
        "Hiểu bài sâu sắc, biết vận dụng kiến thức khoa học vào thực tế.",
        "Có kỹ năng quan sát, thực hành và thí nghiệm khoa học tốt.",
        "Tích cực tham gia các hoạt động; có tinh thần tìm tòi, khám phá.",
        "Nắm vững các phương pháp thực hành và vận dụng kiến thức tốt.",
        "Nắm vững kĩ năng trọng tâm môn học; có tư duy khoa học nhạy bén.",
        "Biết liên hệ kiến thức đã học với các hiện tượng thực tiễn đời sống.",
        "Yêu thích môn học, tích cực đóng góp ý kiến xây dựng bài học."
      ],
      good: [
        "Nắm được kiến thức cơ bản của bài học; thực hành đúng hướng dẫn.",
        "Hoàn thành các bài tập được giao; có tiến bộ trong học tập.",
        "Nắm vững các kĩ năng thực hành cốt lõi của môn học.",
        "Có sự tiến bộ trong kỹ năng quan sát hiện tượng khoa học.",
        "Nắm vững các nội dung trọng tâm môn học trong năm học tốt."
      ],
      fair: [
        "Thực hiện được các nội dung học tập ở mức độ cơ bản hằng ngày.",
        "Tham gia đầy đủ các giờ học; nỗ lực trong thực hành kĩ năng.",
        "Nắm được một số khái niệm khoa học thông qua tranh ảnh, thí nghiệm.",
        "Biết cách phối hợp với bạn bè trong các hoạt động trên lớp học.",
        "Tiếp thu được kiến thức cơ bản theo nội dung chương trình học."
      ],
      poor: [
        "Cần chú ý ghi nhớ nội dung bài học và tập trung nghe giảng.",
        "Cần mạnh dạn hơn khi tham gia hoạt động nhóm và thí nghiệm.",
        "Cần ôn tập lại các kiến thức trọng tâm; hoàn thành bài tập đầy đủ.",
        "Cần tích cực phát biểu xây dựng bài hơn trong các tiết học.",
        "Cần rèn luyện thêm kỹ năng quan sát và ghi chép kiến thức khoa học."
      ]
    }
  },
  "Lịch sử và Địa lí": {
    "general": {
      excellent: [
        "Nắm vững kiến thức lịch sử, địa lí; biết vận dụng liên hệ thực tế.",
        "Có kỹ năng quan sát bản đồ, tranh ảnh và ghi nhớ sự kiện rất tốt.",
        "Tích cực tham gia xây dựng bài; hào hứng tìm hiểu quá khứ, địa phương.",
        "Nắm chắc các mốc lịch sử và đặc điểm địa lí vùng miền cơ bản.",
        "Hoàn thành tốt các nhiệm vụ; biết xác định đối tượng trên bản đồ.",
        "Có tư duy tổng hợp tốt; ham tìm hiểu kiến thức lịch sử, địa lý.",
        "Hoàn thành tốt nội dung chương trình học tập của môn học năm."
      ],
      good: [
        "Ghi nhớ được kiến thức lịch sử, địa lí cơ bản của bài học.",
        "Xác định được các nội dung cơ bản trên bản đồ và sơ đồ bài.",
        "Nắm chắc các nội dung bài học; tham gia xây dựng bài tích cực.",
        "Có tiến bộ trong nhận thức và ghi nhớ các mốc thời gian, địa danh.",
        "Biết vận dụng kiến thức bài học vào thực tế ở mức độ phù hợp."
      ],
      fair: [
        "Nắm được các mốc sự kiện và đặc điểm địa lí tiêu biểu nhất.",
        "Tham gia học tập đầy đủ; thực hiện được các kĩ năng môn học.",
        "Biết cách sử dụng bản đồ và xem tranh ảnh theo hướng dẫn giáo viên.",
        "Theo kịp nội dung chương trình và hoàn thành bài tập cơ bản.",
        "Có ý thức chăm chỉ học bài và tìm hiểu kiến thức môn học."
      ],
      poor: [
        "Cần chú ý ghi nhớ kiến thức bài học; các sự kiện và nhân vật.",
        "Cần luyện tập thêm kỹ năng quan sát bản đồ, lược đồ và hình ảnh.",
        "Cần mạnh dạn phát biểu ý kiến và trao đổi cùng bạn bè.",
        "Cần ôn tập thêm để nắm vững các nội dung đặc điểm đã học.",
        "Cần chăm chỉ học bài thường xuyên hơn để ghi nhớ kiến thức lâu."
      ]
    }
  },
  "Công nghệ": {
    "general": {
      excellent: [
        "Biết sử dụng dụng cụ học tập đúng cách, an toàn và khéo léo.",
        "Thực hiện tốt các nội dung thực hành; thao tác cẩn thận, tỉ mỉ.",
        "Nắm vững kiến thức công nghệ; sản phẩm đạt thẩm mỹ và kĩ thuật.",
        "Tích cực tham gia hoạt động; có ý thức giữ gìn sản phẩm và thiết bị.",
        "Sáng tạo trong thực hành kĩ thuật; hoàn thành tốt chương trình học.",
        "Tự giác rèn luyện kỹ năng và chủ động trong các giờ thực hành lớp.",
        "Đáp ứng tốt các yêu cầu về kiến thức và kĩ năng môn Công nghệ."
      ],
      good: [
        "Biết sử dụng dụng cụ học tập phù hợp và thực hiện đúng thao tác.",
        "Thực hiện đúng các thao tác thực hành cơ bản; có tiến bộ rõ rệt.",
        "Thực hiện được các thao tác kỹ thuật cơ bản theo hướng dẫn giáo viên.",
        "Có ý thức chăm chỉ học tập; nắm vững kĩ năng thực hành cốt lõi.",
        "Sản phẩm thực hành đạt yêu cầu và có sự cố gắng trong rèn luyện."
      ],
      fair: [
        "Tham gia học tập đầy đủ; thực hiện được các bài thực hành theo mẫu.",
        "Biết cách bảo quản đồ dùng học tập và các thiết bị trong phòng học.",
        "Nắm được kiến thức cơ bản; thao tác các bước đơn giản chuẩn xác.",
        "Theo kịp bạn bè trong quá trình hoàn thiện các sản phẩm công nghệ.",
        "Có ý thức thực hiện các yêu cầu học tập do giáo viên đề ra."
      ],
      poor: [
        "Cần thao tác cẩn thận hơn khi thực hành; chú ý an toàn lao động.",
        "Cần chuẩn bị đầy đủ dụng cụ học tập trước khi bắt đầu bài học mới.",
        "Cần tập trung nghe hướng dẫn quy trình để làm sản phẩm đúng mẫu.",
        "Cần chú ý thực hiện đúng quy trình kĩ thuật; rèn chữ và tính toán.",
        "Cần chăm chỉ luyện tập thêm để nâng cao kỹ năng thực hành khéo léo."
      ]
    }
  },
  "Hoạt động trải nghiệm": {
    "general": {
      excellent: [
        "Tích cực tham gia các hoạt động trải nghiệm và hoạt động tập thể.",
        "Có kỹ năng hợp tác, giao tiếp và làm việc nhóm rất hiệu quả.",
        "Biết vận dụng kỹ năng sống vào thực tế; chủ động nhận nhiệm vụ.",
        "Có tinh thần trách nhiệm và ý thức tập thể cao; tự tin trình bày.",
        "Mạnh dạn tham gia khám phá bản thân; hòa đồng vui vẻ cùng các bạn.",
        "Nắm vững các kiến thức dự án và nhiệm vụ trải nghiệm trong năm.",
        "Có nhiều ý tưởng sáng tạo trong các hoạt động của lớp và trường."
      ],
      good: [
        "Tham gia đầy đủ các hoạt động; biết phối hợp cùng bạn bè cùng lớp.",
        "Có cố gắng trong thực hiện nhiệm vụ; rèn luyện kỹ năng sống cơ bản.",
        "Thực hiện tốt các nội dung hoạt động theo sự hướng dẫn của thầy cô.",
        "Tiến bộ trong giao tiếp; có tinh thần học tập tích cực và hòa đồng.",
        "Nắm vững các quy tắc ứng xử và tham gia hoạt động tập thể nhiệt tình."
      ],
      fair: [
        "Tham gia sinh hoạt tập thể theo kế hoạch; thực hiện đúng quy định.",
        "Có ý thức rèn luyện các kỹ năng tự phục vụ cơ bản theo độ tuổi mình.",
        "Nỗ lực trong giao tiếp với bạn bè; hoàn thành nhiệm vụ ở mức đạt.",
        "Theo kịp tiến trình hoạt động chung; bước đầu tự tin thể hiện mình.",
        "Tiếp thu tốt các giá trị sống thông qua các hoạt động trải nghiệm lớp."
      ],
      poor: [
        "Cần mạnh dạn hơn khi tham gia các hoạt động tập thể, khám phá mình.",
        "Cần tích cực và chủ động hơn khi thực hiện nhiệm vụ được giao phó.",
        "Cần chú ý thực hiện nội quy và chuẩn bị đầy đủ cho giờ hoạt động.",
        "Cần rèn luyện thêm kỹ năng giao tiếp; hòa nhập hơn cùng bạn bè.",
        "Cần rèn kỹ năng tự phục vụ và tự tin hơn trong các hoạt động của trường."
      ]
    }
  },
  "Âm nhạc": {
    "general": {
      excellent: [
        "Hát đúng giai điệu, lời ca; phối hợp vận động phụ họa rất sinh động.",
        "Có giọng hát rõ ràng, tự tin khi biểu diễn; thuộc lời bài hát nhanh.",
        "Tích cực tham gia các hoạt động âm nhạc; cảm thụ âm nhạc cực tốt.",
        "Biểu diễn tự nhiên, lôi cuốn; hoàn thành tốt mục tiêu chương trình.",
        "Biết thưởng thức âm nhạc và có năng khiếu thể hiện cảm xúc bài hát.",
        "Nắm vững các kiến thức về nhịp, phách và kĩ năng gõ đệm nhịp nhàng.",
        "Luôn hào hứng trong các giờ học; là hạt nhân văn nghệ của lớp học."
      ],
      good: [
        "Thuộc lời bài hát và hát đúng nhịp, giai điệu ở mức độ căn bản.",
        "Có cố gắng trong luyện hát; biết kết hợp một số động tác phụ họa.",
        "Nắm vững các kĩ năng âm nhạc cơ bản; hoàn thành bài tập môn học.",
        "Luôn tham gia các hoạt động hát tập thể với tinh thần tích cực, vui tươi.",
        "Có sự tiến bộ rõ rệt trong việc rèn luyện giọng hát và phong thái."
      ],
      fair: [
        "Hát đúng lời và giai điệu ở mức độ hoàn thành bài học hằng ngày.",
        "Tham gia đầy đủ các giờ học; nỗ lực trong thực hiện bài tập.",
        "Biết cách gõ đệm cho bài hát theo sự chỉ dẫn của giáo viên đứng lớp.",
        "Có ý thức nghe nhạc và tìm hiểu về các nhạc cụ đơn giản trong đời sống.",
        "Nắm được nội dung cơ bản của các bài hát trong chương trình tiểu học."
      ],
      poor: [
        "Cần luyện hát rõ lời và giữ đúng nhịp phách của bài hát kĩ hơn.",
        "Cần mạnh dạn hơn khi tham gia biểu diễn tiết mục trước tập thể lớp.",
        "Cần chú ý tập trung nghe nhạc và giữ đúng cao độ của các nốt nhạc.",
        "Cần luyện tập thêm các động tác phụ họa để biểu diễn tự tin hơn.",
        "Cần chăm chỉ rèn luyện kỹ năng hát và tham gia hoạt động tập thể."
      ]
    }
  },
  "Mĩ thuật": {
    "general": {
      excellent: ["Khéo tay, luôn hoàn thành bài vẽ/sản phẩm nhanh, đẹp, có sáng tạo.", "Biết chọn lọc màu sắc hài hoà, có mắt thẩm mỹ tốt, thể hiện ý tưởng phong phú và sáng tạo."],
      good: ["Thực hiện sản phẩm đúng kĩ thuật, biết mô tả hình ảnh, màu sắc đẹp.", "Nắm vững cách thực hành và sáng tạo được sản phẩm đạt chất lượng tốt."],
      fair: ["Thực hiện bài tập mĩ thuật đầy đủ, cần tô màu đều nét hơn.", "Sản phẩm đảm bảo các tiêu chí nhưng cần thêm sự sáng tạo và cẩn thận."],
      poor: ["Chưa hoàn thành sản phẩm mĩ thuật, nét vẽ còn lúng túng.", "Chưa có ý thức chuẩn bị đồ dùng học tập vẽ."]
    }
  },
  "Giáo dục thể chất": {
    "general": {
      excellent: ["Thực hiện tốt các bài tập thể dục, tham gia tích cực, nhiệt tình các trò chơi.", "Tác phong nhanh nhẹn, khỏe mạnh, đạt chỉ số vận động tốt."],
      good: ["Có ý thức rèn luyện tốt, tham gia đầy đủ các hoạt động vận động.", "Biết tự giác tập luyện, chơi trò chơi tích cực và đúng luật."],
      fair: ["Thực hiện được cơ bản các động tác, cần cố gắng nhanh nhẹn hơn.", "Có tham gia vận động nhưng đôi khi chưa thực sự chú ý tư thế."],
      poor: ["Chưa hoàn thành động tác thể dục, cần tự giác rèn luyện nhiều hơn.", "Chưa tích cực tham gia các trò chơi vận động tập thể."]
    }
  },
  "Tiếng Anh": {
    "general": {
      excellent: ["Sử dụng Tiếng Anh hiệu quả, nghe và phản hồi cực tốt trong giao tiếp.", "Nắm vững kiến thức, tự tin nói các cụm từ/câu đơn giản lưu loát."],
      good: ["Nắm vững kiến thức Tiếng Anh, giao tiếp tốt trong ngữ cảnh quen thuộc.", "Thể hiện sự hứng thú, có kĩ năng nghe và nói Tiếng Anh tốt."],
      fair: ["Nắm được kiến thức Tiếng Anh cơ bản, có thể giao tiếp ở mức đơn giản.", "Thực hiện đầy đủ bài tập Tiếng Anh nhưng cần rèn thêm kỹ năng nghe."],
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

