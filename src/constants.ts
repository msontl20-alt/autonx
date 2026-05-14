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
    "1": {
      excellent: ["Nhận dạng, đọc, viết các số đến 100 rất tốt. Cộng trừ phạm vi 100 thành thạo.", "Thông minh, nhanh nhẹn. Biết viết sơ đồ tách gộp theo mô hình chính xác.", "Làm toán nhanh, chính xác. Nhận diện hình vuông, tròn, tam giác rất tốt."],
      good: ["Biết cộng, trừ trong phạm vi 100. Viết số rõ ràng, sạch đẹp.", "Nhận diện mặt số tốt, điền dấu lớn bé chính xác, hoàn thành bài tốt."],
      fair: ["Hoàn thành bài toán. Cần rèn kĩ năng tính toán cẩn thận hơn, số viết còn ngược.", "Biết làm toán cộng trừ nhưng đôi khi còn chậm, cần rèn luyện thêm tốc độ."],
      poor: ["Chưa nắm vững mặt số, tính toán còn nhầm lẫn nhiều. Cần rèn luyện thêm.", "Cần đặt tính cẩn thận, nhận diện hình hình học còn lúng túng."]
    },
    "2": {
      excellent: ["Nắm vững phép cộng trừ có nhớ. Thuộc bảng nhân, chia 2 và 5 thành thạo.", "Tính toán nhanh nhẹn. Giải quyết tốt các bài toán thực tế có lời văn.", "Thực hiện phép tính nhanh xác, xem đồng hồ đúng giờ, đáng khen."],
      good: ["Biết thực hiện cộng trừ có nhớ. Làm bài cẩn thận, rõ ràng.", "Nắm vững kiến thức toán học cơ bản, biết ước lượng độ dài các vật."],
      fair: ["Biết làm phép tính nhưng giải toán có lời văn còn lúng túng, cần rèn thêm.", "Tính toán đôi khi còn thiếu cẩn thận, cần học kĩ lại bảng cửu chương."],
      poor: ["Tính toán sai nhiều, chưa thuộc các bảng nhân chia đã học.", "Tiếp thu bài còn chậm, chưa nắm vững cấu tạo số."]
    },
    "3": {
      excellent: ["Nắm vững kiến thức, có kỹ năng tính toán thành thạo.", "Thông minh, tính toán nhanh nhẹn.", "Giải toán nhanh, chính xác, cẩn thận.", "Nhận diện tốt hình khối, giải quyết tốt bài toán thực tế."],
      good: ["Tiếp thu bài tốt, tính toán chính xác.", "Thực hiện tốt các yêu cầu của bài toán.", "Biết quan sát tranh và viết phép tính chính xác."],
      fair: ["Biết thực hiện phép tính nhưng còn nhầm lẫn khi nhớ.", "Cần rèn tính cẩn thận hơn khi giải toán.", "Hoàn thành bài toán nhưng thao tác còn chậm."],
      poor: ["Tiếp thu chậm, chưa hoàn thành bài, cố gắng hơn nhé.", "Kĩ năng tính toán còn chậm, hay bôi xóa nhiều.", "Chưa nắm chắc tên gọi các thành phần phép tính."]
    },
    "4": {
      excellent: ["Nắm chắc kiến thức đã học. Tính toán thành thạo, giải toán đúng.", "Tiếp thu nhanh. Hiểu và làm chính xác các bài tập.", "Có tư duy toán tốt, tính toán cẩn thận, giải toán thành thạo."],
      good: ["Học khá, biết tính thành thạo các phép tính.", "Tiếp thu bài khá tốt. Thực hành thành thạo các bài tập."],
      fair: ["Nắm được kiến thức cơ bản tuy nhiên thực hiện phép tính còn chậm.", "Đã hoàn thành nội dung môn học nhưng tính toán còn hay nhầm lẫn."],
      poor: ["Tiếp thu bài chậm, tính toán chưa cẩn thận, giải toán chưa tốt.", "Chưa nắm chắc kiến thức, kĩ năng môn học."]
    },
    "5": {
      excellent: ["Học tốt, biết tính thành thạo chu vi và diện tích các hình học.", "Giỏi toán, tính nhanh thành thạo các phép tính.", "Sáng tạo trong giải toán có lời văn và giải các dạng toán phức tạp."],
      good: ["Làm bài nhanh, kĩ năng tính toán tốt, trình bày sạch đẹp.", "Nắm vững kiến thức phân số, số thập phân và vận dụng khá tốt."],
      fair: ["Làm đúng kết quả nhưng đặt tính chưa cẩn thận, cần chú ý.", "Biết giải toán nhưng đôi khi trình bày câu lời giải chưa đúng."],
      poor: ["Tiếp thu chậm, tính toán sai nhiều, cần rèn luyện thêm.", "Chưa nắm vững các phép toán with phân số và số thập phân."]
    },
    "general": {
      excellent: ["Nắm vững kiến thức, kĩ năng giải toán thành thạo.", "Thông minh, tính toán nhanh nhẹn, chính xác."],
      good: ["Học khá tốt môn Toán, tính toán cẩn thận.", "Nắm vững các phép tính cơ bản và biết ứng dụng."],
      fair: ["Hoàn thành các dạng toán cơ bản nhưng còn chậm.", "Biết làm tính nhưng cần trình bày cẩn thận hơn."],
      poor: ["Cần ôn luyện nhiều hơn các kĩ năng tính toán cơ bản.", "Còn lúng túng khi giải toán có lời văn."]
    }
  },
  "Tiếng Việt": {
    "1": {
      excellent: ["Đọc trơn to, rõ ràng, lưu loát. Bài viết sạch đẹp, đúng nét, đúng độ cao.", "Phát âm chuẩn xác. Hiểu nội dung yêu cầu bài đọc, viết chữ nắn nót.", "Đọc chữ trôi chảy. Biết nhìn tranh nối từ và trả lời câu hỏi tốt."],
      good: ["Đọc bài lưu loát, giọng đọc vừa đủ nghe. Điền khuyết đúng yêu cầu.", "Hoàn thành bài viết rõ ràng, nắm được luật chính tả cơ bản."],
      fair: ["Đọc còn đánh vần chậm, viết chữ chưa đều nét, cần rèn luyện thêm.", "Đọc đúng nhưng giọng còn nhỏ. Chữ viết đôi khi còn sai khoảng cách."],
      poor: ["Đọc ngập ngừng, chưa nhớ hết vần. Chữ viết chưa đúng mẫu, sai lỗi nhiều.", "Chưa có khả năng nghe - viết. Cần luyện đọc và viết nhiều hơn."]
    },
    "2": {
      excellent: ["Đọc lưu loát, ngắt nghỉ đúng chỗ. Viết đoạn văn ngắn có hình ảnh hay.", "Chữ viết đều, đẹp. Trả lời câu hỏi lưu loát, diễn đạt câu trọn vẹn.", "Đọc to, rõ ràng. Biết dùng từ đặt câu đúng và viết văn lưu loát."],
      good: ["Đọc bài tương đối tốt. Viết chữ rõ ràng, trình bày sạch sẽ.", "Kĩ năng đọc hiểu tốt. Viết được đoạn văn ngắn theo gợi ý."],
      fair: ["Đọc bài to nhưng kĩ năng viết văn còn hạn chế, lặp từ nhiều.", "Chữ viết chưa đẹp, còn sai nét, ngắt nghỉ câu chưa đúng vị trí."],
      poor: ["Kĩ năng đọc hiểu còn hạn chế. Viết chính tả sai nhiều lỗi.", "Chưa trả lời đúng nội dung câu hỏi, đoạn văn còn sơ sài."]
    },
    "3": {
      excellent: ["Đọc bài to, rõ ràng, hiểu tốt nội dung bài đọc.", "Viết văn có hình ảnh sinh động, diễn đạt mạch lạc.", "Đọc lưu loát, viết chính tả và đặt câu tốt."],
      good: ["Nắm vững nội dung môn học, hoàn thành tốt các bài tập.", "Đọc trôi chảy, viết đúng chính tả với tốc độ phù hợp."],
      fair: ["Đọc đúng nhưng giọng đọc còn nhỏ, viết chính tả còn vài lỗi.", "Hiểu bài nhưng diễn đạt câu chưa thực sự trọn vẹn."],
      poor: ["Kĩ năng đọc và viết còn hạn chế, rèn thêm nhé.", "Đọc còn ngập ngừng, viết sai chính tả nhiều."]
    },
    "4": {
      excellent: ["Bước đầu biết đọc diễn cảm, trả lời tốt các câu hỏi.", "Bài văn có ý hay, chọn hình ảnh đẹp, diễn đạt tốt.", "Chữ viết sạch đẹp, đảm bảo tốc độ, đúng chính tả."],
      good: ["Đọc bài to, rõ ràng, lưu loát. Biết ngắt nghỉ hợp lí.", "Biết sử dụng các biện pháp nghệ thuật trong viết văn."],
      fair: ["Tốc độ viết bài còn chậm, cần đọc sách báo nhiều hơn.", "Bài tập làm văn còn sơ sài, cần chú ý sắp xếp ý văn."],
      poor: ["Chưa kể được câu chuyện, đọc nhỏ và vấp nhiều.", "Tốc độ đọc viết quá chậm, cần rèn luyện tích cực."]
    },
    "5": {
      excellent: ["Đọc to, rõ ràng lưu loát. Câu văn có hình ảnh phong phú, cảm xúc chân thành.", "Nắm vững vốn từ và đặt câu đúng. Viết văn lưu loát, sáng tạo."],
      good: ["Đọc bài tương đối tốt, câu văn có hình ảnh hay.", "Chữ viết trình bày sạch đẹp, đọc rõ ràng hiểu nội dung."],
      fair: ["Chữ viết chưa đẹp, kĩ năng đọc thành thạo nhưng cần rèn dùng từ.", "Hoàn thành nội dung môn học. Cần rèn đọc và viết diễn cảm hơn."],
      poor: ["Chưa tập trung trong học tập, kỹ năng viết bị hạn chế, cần rèn chữ.", "Đọc còn hay vấp, viết đoạn văn lủng củng thiếu ý."]
    },
    "general": {
      excellent: ["Tiếp thu bài nhanh, kĩ năng đọc - hiểu và viết rất tốt.", "Đọc trôi chảy, diễn cảm, viết văn sáng tạo."],
      good: ["Đọc viết khá thành thạo, chữ viết tương đối sạch đẹp."],
      fair: ["Biết đọc và viết cơ bản nhưng cần luyện thêm tốc độ."],
      poor: ["Mắc nhiều lỗi chính tả, đọc còn chậm và đánh vần."]
    }
  },
  "Tin học": {
    "general": {
      excellent: ["Em thao tác tốt với chuột và bàn phím, thực hiện nhanh, chính xác.", "Thành thạo các kĩ năng, hoàn thành tốt các bài thực hành trên máy."],
      good: ["Có kỹ năng sử dụng máy tính cơ bản khá tốt.", "Thực hành đầy đủ yêu cầu, nắm bắt các phần mềm học tập."],
      fair: ["Đã làm quen được máy tính nhưng thao tác còn chậm.", "Cần luyện thêm tốc độ đánh máy và sử dụng chuột."],
      poor: ["Kĩ năng thực hành trên máy tính còn rất hạn chế."]
    }
  },
  "Đạo đức": {
    "general": {
      excellent: ["Nhận biết được hành vi đạo đức đúng, vận dụng tốt vào thực tiễn.", "Hăng hái phát biểu, tự giác thực hiện những hành động tốt.", "Có hành vi ứng xử phù hợp hoàn cảnh, thực hiện tốt nội quy."],
      good: ["Hiểu được cách thức thể hiện những hành vi đạo đức đã học.", "Nêu tình huống và giải quyết theo nội dung bài học khá tốt.", "Nhận biết được hành vi đúng sai và biết điều chỉnh thái độ."],
      fair: ["Hoàn thành kiến thức môn học, cần mạnh dạn hơn khi đưa ra cách xử lí.", "Nhận biết được hành vi chưa đúng nhưng đôi lúc chưa biết cách tự sửa."],
      poor: ["Chưa áp dụng tốt các hành vi đạo đức đã học.", "Cần rèn luyện nhiều hơn các hành vi, ứng xử đúng mực trong cuộc sống."]
    }
  },
  "Tự nhiên và Xã hội": {
    "general": {
      excellent: ["Nắm được nội dung bài học và vận dụng tốt kiến thức đã học vào thực tiễn.", "Có vốn hiểu biết về tự nhiên tốt, quan sát và suy luận giỏi.", "Tự giác tham gia và thực hiện tốt các hoạt động học tập khám phá."],
      good: ["Biết phối hợp với các bạn trong nhóm để hoàn thành nhiệm vụ.", "Nhận biết tốt thế giới xung quanh, hoàn thành đầy đủ bài học.", "Chăm học bài, thích tìm hiểu kiến thức khoa học, tự nhiên."],
      fair: ["Hoàn thành môn học, cần tập trung quan sát thực tế hơn.", "Nắm được kiến thức cơ bản nhưng cần mạnh dạn hơn khi phát biểu."],
      poor: ["Vốn hiểu biết về tự nhiên còn hạn chế, ít tham gia hoạt động.", "Chưa nắm vững các kiến thức tự nhiên xã hội cơ bản."]
    }
  },
  "Khoa học": {
    "general": {
      excellent: ["Hiểu bài, khám phá và vận dụng tốt kiến thức Khoa học vào cuộc sống.", "Chủ động nắm bắt và ghi nhớ kiến thức khoa học tự nhiên rất tốt."],
      good: ["Nắm vững kiến thức khoa học đã học và biết liên hệ thực tế.", "Chăm học, hoàn thành tốt nội dung các bài tìm hiểu khoa học."],
      fair: ["Hoàn thành nội dung môn học, cần tích cực quan sát hiện tượng thực tế hơn."],
      poor: ["Chưa hoàn thành kiến thức kỹ năng môn Khoa học."]
    }
  },
  "Lịch sử và Địa lí": {
    "general": {
      excellent: ["Nắm vững kiến thức lịch sử, địa lí, biết vận dụng vào thực tiễn tuyệt vời.", "Tiếp thu nhanh, ghi nhớ các sự kiện và đặc điểm địa lí rất tốt."],
      good: ["Học khá, biết liên hệ kiến thức Lịch sử - Địa lí vào đời sống.", "Nắm vững kiến thức cơ bản và hoàn thành tốt bài học."],
      fair: ["Nắm được kiến thức cơ bản nhưng cần tích cực chủ động hơn.", "Hoàn thành môn học, cần học kỹ hơn các mốc lịch sử, sự kiện."],
      poor: ["Chưa hoàn thành kiến thức kĩ năng môn Lịch sử - Địa lí."]
    }
  },
  "Công nghệ": {
    "general": {
      excellent: ["Nắm vững kiến thức Công nghệ, vận dụng linh hoạt vào thực hành.", "Tích cực, chủ động tiếp thu bài, thao tác thủ công, kỹ thuật khéo léo."],
      good: ["Học khá, biết vận dụng bài học công nghệ, kỹ thuật vào thực tiễn.", "Hoàn thành tốt các sản phẩm thực hành theo yêu cầu."],
      fair: ["Hoàn thành các yêu cầu nội dung chương trình môn Công nghệ.", "Cần tích cực thực hành và chủ động hơn trong học tập."],
      poor: ["Chưa hoàn thành kiến thức kĩ năng thực hành môn Công nghệ."]
    }
  },
  "Hoạt động trải nghiệm": {
    "general": {
      excellent: ["Tự tin khi tham gia hoạt động tập thể, vận dụng tốt kỹ năng xử lý tình huống.", "Biết chia sẻ, khám phá bản thân và môi trường xung quanh rất tốt."],
      good: ["Tham gia thảo luận tích cực, nhiệt tình, đoàn kết với bạn bè.", "Nhận biết được những việc nên và không nên làm, hoàn thành tốt nhiệm vụ."],
      fair: ["Hoàn thành nội dung môn học, cần mạnh dạn hơn khi giao tiếp.", "Cần tự tin hơn khi tham gia các hoạt động tập thể."],
      poor: ["Chưa mạnh dạn, chưa biết tự chăm sóc bản thân và xử lý tình huống.", "Cần tích cực tham gia các hoạt động trường lớp hơn."]
    }
  },
  "Âm nhạc": {
    "general": {
      excellent: ["Hát hay, biểu diễn tự nhiên, đúng giai điệu và cảm thụ âm nhạc tốt.", "Thuộc lời ca, tự tin kết hợp vận động phụ hoạ cho bài hát rất sinh động."],
      good: ["Thuộc lời, hát đúng giai điệu bài hát, biết gõ đệm nhịp nhàng.", "Hát to rõ lời, hoàn thành tốt các nội dung âm nhạc trong tháng."],
      fair: ["Biết hát theo giai điệu, cần mạnh dạn hơn khi kết hợp phụ họa.", "Thuộc bài hát cơ bản nhưng cần chú ý biểu diễn tự nhiên hơn."],
      poor: ["Chưa thuộc lời bài hát, hát chưa đúng giai điệu.", "Nhút nhát, chưa tích cực tham gia các hoạt động âm nhạc."]
    }
  },
  "Mĩ thuật": {
    "general": {
      excellent: ["Khéo tay, luôn hoàn thành bài vẽ/sản phẩm nhanh, đẹp, có sáng tạo.", "Biết chọn lọc màu sắc hài hoà, có mắt thẩm mỹ tốt, thể hiện ý tưởng phong phú và sáng tạo."],
      good: ["Hoàn thành sản phẩm đúng yêu cầu, biết mô tả hình ảnh, màu sắc đẹp.", "Nắm được cách thực hành và vận dụng tạo sản phẩm đạt chất lượng tốt."],
      fair: ["Hoàn thành bài tập mĩ thuật cơ bản, cần tô màu đều nét hơn.", "Sản phẩm đạt yêu cầu nhưng cần thêm sự sáng tạo và cẩn thận."],
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

